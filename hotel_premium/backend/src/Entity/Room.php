<?php

namespace App\Entity;

use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RoomRepository::class)]
class Room
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['hotel:read', 'room:read', 'reservation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['hotel:read', 'room:read', 'reservation:read'])]
    private string $number;

    #[ORM\Column]
    #[Groups(['hotel:read', 'room:read'])]
    private int $capacity;

    #[ORM\Column]
    #[Groups(['hotel:read', 'room:read'])]
    private float $pricePerNight;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['room:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['hotel:read', 'room:read'])]
    private bool $available = true;

    #[ORM\ManyToOne(inversedBy: 'rooms')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read'])]
    private ?Hotel $hotel = null;

    #[ORM\Column]
    #[Groups(['room:read'])]
    private \DateTimeImmutable $createdAt;

    #[ORM\OneToMany(mappedBy: 'room', targetEntity: Reservation::class, orphanRemoval: true)]
    private Collection $reservations;

    #[ORM\Column]
    #[Groups(['room:read'])]
    private bool $maintenance = false;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // ======================
    // GETTERS / SETTERS
    // ======================

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): string
    {
        return $this->number;
    }

    public function setNumber(string $number): self
    {
        $this->number = $number;
        return $this;
    }

    public function getCapacity(): int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): self
    {
        $this->capacity = $capacity;
        return $this;
    }

    public function getPricePerNight(): float
    {
        return $this->pricePerNight;
    }

    public function setPricePerNight(float $pricePerNight): self
    {
        $this->pricePerNight = $pricePerNight;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function isAvailable(): bool
    {
        return $this->available;
    }

    public function setAvailable(bool $available): self
    {
        $this->available = $available;
        return $this;
    }

    public function getHotel(): ?Hotel
    {
        return $this->hotel;
    }

    public function setHotel(?Hotel $hotel): self
    {
        $this->hotel = $hotel;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

   // ==========================
// MAINTENANCE
// ==========================
public function getMaintenance(): bool
{
    return $this->maintenance;
}

public function isMaintenance(): bool
{
    return $this->maintenance;
}

public function setMaintenance(bool $maintenance): self
{
    $this->maintenance = $maintenance;
    return $this;
}

}
