<?php

namespace App\Controller\Api;

use App\Entity\Hotel;
use App\Entity\Room;
use App\Repository\RoomRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/rooms')]
class RoomController extends AbstractController
{
    // ✅ USER + ADMIN
    #[Route('', methods: ['GET'])]
    public function index(RoomRepository $repo): JsonResponse
    {
        return $this->json(
            $repo->findAll(),
            200,
            [],
            ['groups' => ['room:read']]
        );
    }

    // 🔒 ADMIN ONLY
    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);

        if (
            !isset(
                $data['hotelId'],
                $data['number'],
                $data['capacity'],
                $data['pricePerNight']
            )
        ) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $hotel = $em->getRepository(Hotel::class)->find($data['hotelId']);
        if (!$hotel) {
            return $this->json(['error' => 'Hotel not found'], 404);
        }

        $room = new Room();
        $room->setNumber($data['number']);
        $room->setCapacity($data['capacity']);
        $room->setPricePerNight($data['pricePerNight']);
        $room->setDescription($data['description'] ?? null);
        $room->setAvailable($data['available'] ?? true);
        $room->setHotel($hotel);
        $room->setCreatedAt(new \DateTimeImmutable());

        $em->persist($room);
        $em->flush();

        return $this->json(
            $room,
            201,
            [],
            ['groups' => ['room:read']]
        );
    }

    // ✅ USER + ADMIN
    #[Route('/{id}', methods: ['GET'])]
    public function show(Room $room): JsonResponse
    {
        return $this->json(
            $room,
            200,
            [],
            ['groups' => ['room:read']]
        );
    }

    // 🔒 ADMIN ONLY
    #[Route('/{id}', methods: ['PUT'])]
    public function update(
        Room $room,
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);

        if (isset($data['number'])) {
            $room->setNumber($data['number']);
        }

        if (isset($data['capacity'])) {
            $room->setCapacity($data['capacity']);
        }

        if (isset($data['pricePerNight'])) {
            $room->setPricePerNight($data['pricePerNight']);
        }

        if (array_key_exists('description', $data)) {
            $room->setDescription($data['description']);
        }

        if (isset($data['available'])) {
            $room->setAvailable($data['available']);
        }

        $em->flush();

        return $this->json(
            $room,
            200,
            [],
            ['groups' => ['room:read']]
        );
    }

    // 🔒 ADMIN ONLY
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Room $room, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em->remove($room);
        $em->flush();

        return $this->json([
            'message' => 'Room deleted successfully'
        ]);
    }

    // ==========================
    // 🔧 ADMIN → TOGGLE MAINTENANCE
    // ==========================
   #[Route('/{id}/maintenance', methods: ['PUT'])]
public function toggleMaintenance(Room $room, EntityManagerInterface $em): JsonResponse
{
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $newStatus = !$room->getMaintenance();
    $room->setMaintenance($newStatus);

    // 🔥 LOGIQUE CORRECTE
    if ($newStatus === true) {
        // mise en maintenance
        $room->setAvailable(false);
    } else {
        // sortie de maintenance
        $room->setAvailable(true);
    }

    $em->flush();

    return $this->json(
        $room,
        200,
        [],
        ['groups' => ['room:read']]
    );
}

    // ==========================
    // 🏨 ROOMS BY HOTEL (ADMIN)
    // ==========================
    #[Route('/by-hotel/{id}', methods: ['GET'])]
    public function roomsByHotel(
        int $id,
        EntityManagerInterface $em
    ): JsonResponse {
        $rooms = $em->getRepository(Room::class)->findBy(
            ['hotel' => $id],
            ['number' => 'ASC']
        );

        return $this->json(
            $rooms,
            200,
            [],
            ['groups' => ['room:read', 'reservation:read']]
        );
    }
}
