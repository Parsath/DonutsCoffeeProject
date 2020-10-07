<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DonutController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function homepage()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/order", name="app_order")
     */
    public function orderpage()
    {
        return $this->render('home/order.html.twig');
    }

}