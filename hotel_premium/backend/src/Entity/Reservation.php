<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['reservation:read', 'room:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read'])]
    private User $user;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read'])]
    private Room $room;

   #[ORM\Column(type: "date_immutable")]
#[Groups(['reservation:read'])]
private \DateTimeImmutable $startDate;

#[ORM\Column(type: "date_immutable")]
#[Groups(['reservation:read'])]
private \DateTimeImmutable $endDate;


   

    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private \DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int { return $this->id; }

    public function getUser(): User { return $this->user; }
    public function setUser(User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getRoom(): Room { return $this->room; }
    public function setRoom(Room $room): self
    {
        $this->room = $room;
        return $this;
    }

    public function getStartDate(): \DateTimeImmutable { return $this->startDate; }
    public function setStartDate(\DateTimeImmutable $startDate): self
    {
        $this->startDate = $startDate;
        return $this;
    }

    public function getEndDate(): \DateTimeImmutable { return $this->endDate; }
    public function setEndDate(\DateTimeImmutable $endDate): self
    {
        $this->endDate = $endDate;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}
