<?php

namespace App\Entity;

use App\Repository\ToppingLineItemRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ToppingLineItemRepository::class)
 */
class ToppingLineItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    private $toppingPrice;

    /**
     * @ORM\ManyToOne(targetEntity=Topping::class, inversedBy="toppingLineItems")
     * @ORM\JoinColumn(nullable=false)
     */
    private $topping;

    /**
     * @ORM\ManyToOne(targetEntity=lineItem::class, inversedBy="toppingLineItems")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lineItem;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToppingPrice(): ?float
    {
        return $this->toppingPrice;
    }

    public function setToppingPrice(float $price): self
    {
        $this->toppingPrice = $price;

        return $this;
    }

    public function getTopping(): ?Topping
    {
        return $this->topping;
    }

    public function setTopping(?Topping $topping): self
    {
        $this->topping = $topping;

        return $this;
    }

    public function getLineItem(): ?lineItem
    {
        return $this->lineItem;
    }

    public function setLineItem(?lineItem $lineItem): self
    {
        $this->lineItem = $lineItem;

        return $this;
    }
}
