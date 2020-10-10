<?php


namespace App\Controller;


use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DonutAdminController extends AbstractController
{
    /**
     * @Route("/admin/donut/new")
     */
    public function new(EntityManagerInterface $em)
    {
        $article = new Article();
        $article->setName("Donut Neo 4");
        $article->setPrice(4.00);
        $article->setAvailability(0);
        $article->setCarousel(0);
        $article->setDescription("Dunno Names Anymore");
        $article->setLink("/images/Carousel/DonutCarousel1.png");
        $article->setQuantity(0);

        $em->persist($article);
        $em->flush();


        Return new Response(sprintf(
            'New Article: %d name: %s price: %d',
            $article->getId(),
            $article->getName(),
            $article->getPrice()
        ));
    }

}