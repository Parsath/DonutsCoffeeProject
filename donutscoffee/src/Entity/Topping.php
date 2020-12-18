<?php

namespace App\Entity;

use App\Repository\ToppingRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=ToppingRepository::class)
 */
class Topping
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isAvailable;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     * @Gedmo\Slug(fields={"name"})
     */
    private $slug;

    /**
     * @ORM\Column(type="float")
     */
    private $price;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isDeleted = false;

    /**
     * @ORM\OneToMany(targetEntity=ToppingLineItem::class, mappedBy="topping")
     */
    private $toppingLineItems;

    public function __construct()
    {
        $this->toppingLineItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIsAvailable(): ?bool
    {
        return $this->isAvailable;
    }

    public function setIsAvailable(bool $isAvailable): self
    {
        $this->isAvailable = $isAvailable;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|ToppingLineItem[]
     */
    public function getToppingLineItems(): Collection
    {
        return $this->toppingLineItems;
    }

    public function addToppingLineItem(ToppingLineItem $toppingLineItem): self
    {
        if (!$this->toppingLineItems->contains($toppingLineItem)) {
            $this->toppingLineItems[] = $toppingLineItem;
            $toppingLineItem->setTopping($this);
        }

        return $this;
    }

    public function removeToppingLineItem(ToppingLineItem $toppingLineItem): self
    {
        if ($this->toppingLineItems->contains($toppingLineItem)) {
            $this->toppingLineItems->removeElement($toppingLineItem);
            // set the owning side to null (unless already changed)
            if ($toppingLineItem->getTopping() === $this) {
                $toppingLineItem->setTopping(null);
            }
        }

        return $this;
    }

    public function getIsDeleted(): ?bool
    {
        return $this->isDeleted;
    }

    public function setIsDeleted(?bool $isDeleted): self
    {
        $this->isDeleted = $isDeleted;

        return $this;
    }
}
