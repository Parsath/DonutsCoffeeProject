<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DonutOrderController extends AbstractController
{
    /**
     * @Route("/order", name="app_order")
     */
    public function homepage()
    {
        return $this->render('home/order.html.twig');
    }
}