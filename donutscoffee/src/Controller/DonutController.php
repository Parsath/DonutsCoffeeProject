<?php


namespace App\Controller;


use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DonutController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function homepage(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Article::class);

        /** @var array $articles */
        $articles = $repository->findBy(
            ['carousel' => 1]
        );


        return $this->render('home/index.html.twig', [
            'articles' => $articles,
        ]);
    }

    /**
     * @Route("/order", name="app_order")
     */
    public function orderpage(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Article::class);

        /** @var array $articles */
        $articles = $repository->findBy(
            ['availability' => 1]
        );

        if(!$articles) {
            throw $this->createNotFoundException(sprintf('Sorry our menu is actually Empty x_x'));
        }


        return $this->render('home/order.html.twig', [
            'articles' => $articles,
        ]);
    }

}