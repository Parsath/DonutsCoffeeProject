<?php

namespace App\Controller;

use App\Entity\Topping;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ToppingAdminController extends AbstractController
{
    /**
     * @Route("/admin/topping/new")
     */
    public function index(EntityManagerInterface $em)
    {
        $topping = new Topping();
        $topping->setName("Kewkew");
        $topping->setPrice(1);
        $topping->setIsAvailable(1);

        $em->persist($topping);
        $em->flush();


        Return new Response(sprintf(
            'New Topping: %d name: %s slug: %s price: %d',
            $topping->getId(),
            $topping->getName(),
            $topping->getSlug(),
            $topping->getIsAvailable(),
            $topping->getPrice()
        ));
    }
}
