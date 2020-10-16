<?php


namespace App\Controller;


use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DonutOrderController extends AbstractController
{

    /**
     * @Route("/order", name="app_order")
     */
    public function orderPage(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Article::class);

        /** @var array $articles */
        $articles = $repository->findBy(
            ['availability' => 1]
        );

//        if(!$articles) {
//            throw $this->createNotFoundException(sprintf('Sorry we\'re actually encountering a problem x_x'));
//        }


        return $this->render('home/order.html.twig', [
            'articles' => $articles,
        ]);
    }

    /**
     * @Route("/order/{slug}", name="article_display", methods={"POST"})
     */
    public function openDonut($slug, EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Article::class);

        /** var Article $article */
        $article = $repository->findOneBy(
            ['slug' => $slug]
        );

        return new JsonResponse([
            'name' => $article->getName(),
            'link' => $article->getLink(),
            'slug' => $article->getSlug(),
            'price' => $article->getPrice(),
            'description' => $article->getDescription()
        ]);
    }
}