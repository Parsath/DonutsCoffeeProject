<?php


namespace App\Controller;


use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DonutOrderController extends AbstractController
{

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