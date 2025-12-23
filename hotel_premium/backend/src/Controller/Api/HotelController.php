<?php

namespace App\Controller\Api;

use App\Entity\Hotel;
use App\Repository\HotelRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/hotels')]
class HotelController extends AbstractController
{
    // ✅ ACCESSIBLE USER + ADMIN
    #[Route('', methods: ['GET'])]
    public function index(HotelRepository $repository): JsonResponse
    {
        return $this->json(
            $repository->findAll(),
            200,
            [],
            ['groups' => ['hotel:read']]
        );
    }

    // 🔒 ADMIN ONLY
    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);

        $hotel = new Hotel();
        $hotel->setName($data['name']);
        $hotel->setCity($data['city']);
        $hotel->setDescription($data['description'] ?? null);
        $hotel->setPricePerNight($data['pricePerNight']);

        $em->persist($hotel);
        $em->flush();

        return $this->json(
            $hotel,
            201,
            [],
            ['groups' => ['hotel:read']]
        );
    }

    // ✅ USER + ADMIN
    #[Route('/{id}', methods: ['GET'])]
    public function show(Hotel $hotel): JsonResponse
    {
        return $this->json(
            $hotel,
            200,
            [],
            ['groups' => ['hotel:read']]
        );
    }

    // 🔒 ADMIN ONLY
    #[Route('/{id}', methods: ['PUT'])]
    public function update(
        Hotel $hotel,
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $hotel->setName($data['name']);
        }
        if (isset($data['city'])) {
            $hotel->setCity($data['city']);
        }
        if (array_key_exists('description', $data)) {
            $hotel->setDescription($data['description']);
        }
        if (isset($data['pricePerNight'])) {
            $hotel->setPricePerNight($data['pricePerNight']);
        }

        $em->flush();

        return $this->json(
            $hotel,
            200,
            [],
            ['groups' => ['hotel:read']]
        );
    }

    // 🔒 ADMIN ONLY
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Hotel $hotel, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em->remove($hotel);
        $em->flush();

        return $this->json(['message' => 'Hotel deleted successfully']);
    }
}
