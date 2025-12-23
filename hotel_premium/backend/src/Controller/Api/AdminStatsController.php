<?php

namespace App\Controller\Api;

use App\Entity\Hotel;
use App\Entity\Room;
use App\Entity\Reservation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admin')]
class AdminStatsController extends AbstractController
{
    // ==========================
    // 📊 STATS GÉNÉRALES
    // ==========================
    #[Route('/stats', methods: ['GET'])]
    public function stats(EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        return $this->json([
            'hotels' => $em->getRepository(Hotel::class)->count([]),
            'rooms' => $em->getRepository(Room::class)->count([]),
            'reservations' => $em->getRepository(Reservation::class)->count([]),
            'maintenanceRooms' => $em->getRepository(Room::class)->count([
                'maintenance' => true
            ])
        ]);
    }

    // ==========================
    // 📅 RÉSERVATIONS PAR MOIS (AVEC ANNÉE)
    // ==========================
    #[Route('/stats/reservations-by-month', methods: ['GET'])]
public function reservationsByMonth(
    Request $request,
    EntityManagerInterface $em
): JsonResponse {
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $year = $request->query->get('year', date('Y'));

    $sql = "
        SELECT 
            MONTH(start_date) AS month,
            COUNT(*) AS total
        FROM reservation
        WHERE YEAR(start_date) = :year
        GROUP BY MONTH(start_date)
        ORDER BY month
    ";

    $data = $em->getConnection()
        ->executeQuery($sql, ['year' => $year])
        ->fetchAllAssociative();

    return $this->json($data);
}

    // ==========================
    // 🏨 TAUX D’OCCUPATION (LOGIQUE & SIMPLE)
    // ==========================
   #[Route('/stats/occupancy', methods: ['GET'])]
public function occupancy(
    Request $request,
    EntityManagerInterface $em
): JsonResponse {
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    $year = (int) $request->query->get('year', date('Y'));

    $startOfYear = new \DateTimeImmutable("$year-01-01");
    $endOfYear   = new \DateTimeImmutable("$year-12-31");

    $totalRooms = $em->getRepository(Room::class)->count([]);

    // chambres ayant au moins une réservation sur l'année
    $occupiedRooms = (int) $em->createQueryBuilder()
        ->select('COUNT(DISTINCT r.room)')
        ->from(Reservation::class, 'r')
        ->where('r.startDate <= :endYear')
        ->andWhere('r.endDate >= :startYear')
        ->setParameter('startYear', $startOfYear)
        ->setParameter('endYear', $endOfYear)
        ->getQuery()
        ->getSingleScalarResult();

    $rate = $totalRooms > 0
        ? round(($occupiedRooms / $totalRooms) * 100, 2)
        : 0;

    return $this->json([
        'year' => $year,
        'totalRooms' => $totalRooms,
        'occupiedRooms' => $occupiedRooms,
        'occupancyRate' => $rate
    ]);
}
}
