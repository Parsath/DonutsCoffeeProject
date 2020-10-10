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

}