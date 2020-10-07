<?php


namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DonutController
{
    /**
     * @Route("/")
     */
    public function homepage()
    {
        return new Response('Works!');
    }

}