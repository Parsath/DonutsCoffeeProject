<?php


namespace App\Controller;


use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

//     * @Route("/order/pickup", name="order_pickup", methods={"POST"})
    /**
     * @Route("/order/pickup", name="order_pickup")
     */
    public function pickUpOrder(Request $request, EntityManagerInterface $em)
    {
//        $response = new Response();
//        $response->setContent(json_decode($request->getContent(), true));

//        $donutArray = json_decode($request->getContent());

        $donutArray = array();
        $content = $request->getContent();
        if(!empty($content)){
            $donutArray = json_decode($content, true);
        }

        $donutsArray = isset($donutArray['donutArray']) ? $donutArray['donutArray'] : null;

//        dd($donutArray);
//        $repository = $em->getRepository(Article::class);
//
//        /** var Article $article */
//        $article = $repository->findOneBy(
//            ['slug' => $slug]
//        );
//
//        return new JsonResponse([
//            'name' => $article->getName(),
//            'link' => $article->getLink(),
//            'slug' => $article->getSlug(),
//            'price' => $article->getPrice(),
//            'description' => $article->getDescription()
//        ]);

        Return new JsonResponse([
                'donuts' => $donutsArray,
        ]);
    }
}