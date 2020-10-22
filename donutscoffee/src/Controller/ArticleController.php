<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ArticleController extends AbstractController
{
//     * @Route("/admin/article/new", name="add_article", )
    /**
     * @Route("/admin/article/new", name="add_article", methods={"POST"})
     */
    public function add(LoggerInterface $logger, Request $request, EntityManagerInterface $em)
    {
        $article = new Article();

        $newDonut = $request->request->all();

        $repository = $em->getRepository(Article::class);

        /** @var Article $article */
        $taken = $repository->findOneBy(
            ['name' => $newDonut['add-name']]
        );
        $linkTaken = $repository->findOneBy(
            ['link' => $newDonut['add-link']]
        );

        if($taken)
        {
            return new JsonResponse([
                'errorName' => "Name Taken",
            ]);
        }
        elseif ($linkTaken)
        {
            return new JsonResponse([
                'errorLink' => "Link Taken",
            ]);
        }
        else{
            $article->setName($newDonut['add-name']);
            $article->setDescription($newDonut['add-description']);
            $article->setQuantity($newDonut['add-quantity']);
            $article->setAvailability();
            $article->setPrice($newDonut['add-price']);
            $article->setLink($newDonut['add-link']);
            $article->setCarousel($newDonut['add-carousel']);

            $em->persist($article);
            $em->flush();

            return new JsonResponse([
                'name' => $article->getName(),
                'link' => $article->getLink(),
                'slug' => $article->getSlug(),
                'price' => $article->getPrice(),
                'description' => $article->getDescription()
            ]);
        }
    }

    /**
     * @Route("/admin/article/delete/{id}", name="delete_article", methods={"POST"})
     */
    public function delete($id, Request $request, EntityManagerInterface $em){

        $repository = $em->getRepository(Article::class);

        /** var Article $article */
        $article = $repository->findOneBy(
            ['id' => $id]
        );

        if ($article){
            $articleName = $article->getName();

            $em->remove($article);
            $em->flush();

            return new JsonResponse([
                'name' => $articleName,
            ]);
        }
        else{
            return new JsonResponse([
                'notFound' => 'Article Not Found',
            ]);
        }
    }
}
