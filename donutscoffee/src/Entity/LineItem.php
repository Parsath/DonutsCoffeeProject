<?php

namespace App\Entity;

use App\Repository\LineItemRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LineItemRepository::class)
 */
class LineItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantity;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=500, nullable=true)
     */
    private $instructions;

    /**
     * @ORM\ManyToOne(targetEntity=Article::class, inversedBy="lineItems")
     * @ORM\JoinColumn(nullable=true)
     */
    private $article;

    /**
     * @ORM\ManyToOne(targetEntity=Order::class, inversedBy="lineItems")
     * @ORM\JoinColumn(nullable=false)
     */
    private $orderArticle;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(): self
    {
        if(!$this->quantity)
        {
            throw new \InvalidArgumentException("Quantity not Set");
        }
        else if(!$this->article->getPrice())
        {
            throw new \InvalidArgumentException("Donut Price not Set");
        }

        $this->price = $this->quantity * $this->article->getPrice();

        return $this;
    }

    public function getInstructions(): ?string
    {
        return $this->instructions;
    }

    public function setInstructions(?string $instructions): self
    {
        $this->instructions = $instructions;

        return $this;
    }

    public function getArticle(): ?Article
    {
        return $this->article;
    }

    public function setArticle(?Article $article): self
    {
        $this->article = $article;

        return $this;
    }

    public function getOrderArticle(): ?Order
    {
        return $this->orderArticle;
    }

    public function setOrderArticle(?Order $orderArticle): self
    {
        $this->orderArticle = $orderArticle;

        return $this;
    }
}
