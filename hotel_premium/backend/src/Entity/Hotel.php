<?php

namespace App\Entity;

use App\Repository\HotelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: HotelRepository::class)]
class Hotel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['hotel:read', 'reservation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['hotel:read', 'hotel:write', 'reservation:read'])]
    private string $name;

    #[ORM\Column(length: 255)]
    #[Groups(['hotel:read', 'hotel:write'])]
    private string $city;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['hotel:read', 'hotel:write'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['hotel:read', 'hotel:write'])]
    private float $pricePerNight;

    #[ORM\Column]
    #[Groups(['hotel:read'])]
    private \DateTimeImmutable $createdAt;

    #[ORM\OneToMany(mappedBy: 'hotel', targetEntity: Room::class, orphanRemoval: true)]
    #[Groups(['hotel:read'])]
    private Collection $rooms;

    public function __construct()
    {
        $this->rooms = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;
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

    public function getPricePerNight(): float
    {
        return $this->pricePerNight;
    }

    public function setPricePerNight(float $pricePerNight): self
    {
        $this->pricePerNight = $pricePerNight;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getRooms(): Collection
    {
        return $this->rooms;
    }

    public function addRoom(Room $room): self
    {
        if (!$this->rooms->contains($room)) {
            $this->rooms->add($room);
            $room->setHotel($this);
        }

        return $this;
    }

    public function removeRoom(Room $room): self
    {
        $this->rooms->removeElement($room);
        return $this;
    }
}
