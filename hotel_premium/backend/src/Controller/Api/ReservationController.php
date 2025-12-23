<?php

namespace App\Controller\Api;

use App\Entity\Reservation;
use App\Entity\Room;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/reservations')]
class ReservationController extends AbstractController
{
    // ==========================
    // CREATE RESERVATION (USER)
    // ==========================
    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $data = json_decode($request->getContent(), true);

        if (
            !isset($data['roomId']) ||
            !isset($data['startDate']) ||
            !isset($data['endDate'])
        ) {
            return $this->json(['error' => 'Missing fields'], 400);
        }

        $room = $em->getRepository(Room::class)->find($data['roomId']);
        if (!$room) {
            return $this->json(['error' => 'Room not found'], 404);
        }

        if ($room->isMaintenance()) {
    return $this->json(
        ['error' => 'Room is under maintenance'],
        403
    );
}

        try {
            $startDate = new \DateTimeImmutable($data['startDate']);
$endDate   = new \DateTimeImmutable($data['endDate']);

        } catch (\Exception $e) {
            return $this->json(['error' => 'Invalid date format'], 400);
        }

        if ($startDate >= $endDate) {
            return $this->json(['error' => 'Invalid dates'], 400);
        }

        // 🔥 CHECK AVAILABILITY (NO OVERLAP)
        $conflict = $em->createQueryBuilder()
            ->select('r')
            ->from(Reservation::class, 'r')
            ->where('r.room = :room')
            ->andWhere('r.startDate < :end')
            ->andWhere('r.endDate > :start')
            ->setParameter('room', $room)
            ->setParameter('start', $startDate)
            ->setParameter('end', $endDate)
            ->getQuery()
            ->getOneOrNullResult();

        if ($conflict) {
            return $this->json(
                ['error' => 'Room already booked for these dates'],
                409
            );
        }

        $reservation = new Reservation();
        $reservation->setRoom($room);
        $reservation->setUser($this->getUser());
        $reservation->setStartDate($startDate);
        $reservation->setEndDate($endDate);

        $em->persist($reservation);
        $em->flush();

        return $this->json(
            $reservation,
            201,
            [],
            ['groups' => ['reservation:read']]
        );
    }

    // ==========================
    // USER → MY RESERVATIONS
    // ==========================
    #[Route('/me', methods: ['GET'])]
    public function myReservations(EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $reservations = $em->getRepository(Reservation::class)->findBy(
            ['user' => $this->getUser()],
            ['createdAt' => 'DESC']
        );

        return $this->json(
            $reservations,
            200,
            [],
            ['groups' => ['reservation:read']]
        );
    }

    // ==========================
    // ADMIN → ALL RESERVATIONS
    // ==========================
    #[Route('', methods: ['GET'])]
    public function all(EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $reservations = $em->getRepository(Reservation::class)->findBy(
            [],
            ['createdAt' => 'DESC']
        );

        return $this->json(
            $reservations,
            200,
            [],
            ['groups' => ['reservation:read']]
        );
    }

    // ==========================
    // CANCEL RESERVATION (USER / ADMIN)
    // ==========================
    #[Route('/{id}', methods: ['DELETE'])]
    public function cancel(
        Reservation $reservation,
        EntityManagerInterface $em
    ): JsonResponse {
        $this->denyAccessUnlessGranted('ROLE_USER');

        if (
            !$this->isGranted('ROLE_ADMIN') &&
            $reservation->getUser() !== $this->getUser()
        ) {
            return $this->json(['error' => 'Forbidden'], 403);
        }

        $em->remove($reservation);
        $em->flush();

        return $this->json([
            'message' => 'Reservation cancelled successfully'
        ]);
    }

    // ==========================
    // ROOM AVAILABILITY (CALENDAR)
    // ==========================
    #[Route('/room/{id}', methods: ['GET'])]
    public function roomAvailability(
        Room $room,
        EntityManagerInterface $em
    ): JsonResponse {
        $reservations = $em->getRepository(Reservation::class)->findBy(
            ['room' => $room],
            ['startDate' => 'ASC']
        );

        return $this->json(
            $reservations,
            200,
            [],
            ['groups' => ['reservation:read']]
        );
    }
}
