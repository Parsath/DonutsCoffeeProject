<?php

namespace App\Controller;

use App\Entity\Article;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ArticleController extends AbstractController
{
    /**
     * @Route("/admin/article/new", name="add_article", methods={"POST"})
     */
    public function add(LoggerInterface $logger,FileUploader $uploader, string $uploadDir, Request $request, EntityManagerInterface $em)
    {

//        File Upload Check
        $token = $request->get("token");

        if (!$this->isCsrfTokenValid('upload', $token))
        {
            $logger->info("CSRF failure");

            return new Response("Operation not allowed",  Response::HTTP_BAD_REQUEST,
                ['content-type' => 'text/plain']);
        }

        $file = $request->files->get('add-link');

        if (empty($file))
        {
            return new Response("No file specified",
                Response::HTTP_UNPROCESSABLE_ENTITY, ['content-type' => 'text/plain']);
        }

        $filename = $file->getClientOriginalName();
        $uploader->upload($uploadDir, $file, $filename);

        $article = new Article();

        $newDonut = $request->request->all();

        $repository = $em->getRepository(Article::class);

        /** @var Article $article */
        $taken = $repository->findOneBy(
            ['name' => $newDonut['add-name']]
        );
        $linkTaken = $repository->findOneBy(
            ['link' => $filename]
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
            $article->setLink($filename);
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

    /**
     * @Route("/admin/article/remove/{id}", name="remove_article", methods={"POST"})
     */
    public function remove($id, Request $request, EntityManagerInterface $em){

        $repository = $em->getRepository(Article::class);

        /** var Article $article */
        $article = $repository->findOneBy(
            ['id' => $id]
        );

        if ($article){
            $articleName = $article->getName();

            $article->setIsDeleted(1);

            $em->persist($article);
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

    /**
     * @Route("/admin/article/edit/{id}", name="edit_article")
     */
    public function edit($id, LoggerInterface $logger,FileUploader $uploader, string $uploadDir, Request $request, EntityManagerInterface $em)
    {

        $repository = $em->getRepository(Article::class);



        /** var Article $article */
        $article = $repository->findOneBy(
            ['id' => $id]
        );

        if($request->isMethod('GET')){
            if ($article){
                return $this->render('article/edit.html.twig', [
                    'article' => $article,
                ]);
            }
            else{
                return new JsonResponse([
                    'notFound' => 'Article Not Found',
                ]);
            }
        }
        elseif($request->isMethod('POST')){

            //        File Upload Check
            $token = $request->get("token");

            if (!$this->isCsrfTokenValid('upload', $token))
            {
                $logger->info("CSRF failure");

                return new Response("Operation not allowed",  Response::HTTP_BAD_REQUEST,
                    ['content-type' => 'text/plain']);
            }

            $file = $request->files->get('edit-link');

            $editDonut = $request->request->all();

            /** @var Article $article */
            $taken = $repository->findOneBy(
                ['name' => $editDonut['edit-name']]
            );

            if (empty($file))
            {
                if($taken && ($taken->getId() != $editDonut['edit-id']) )
                {
                    return new JsonResponse([
                        'errorName' => "Name Taken",
                    ]);
                }
            }
            else
            {
                $filename = $file->getClientOriginalName();
                $uploader->upload($uploadDir, $file, $filename);

                $linkTaken = $repository->findOneBy(
                    ['link' => $filename]
                );

                if($taken && ($taken->getId() != $editDonut['edit-id']) )
                {
                    return new JsonResponse([
                        'errorName' => "Name Taken",
                    ]);
                }
                elseif ($linkTaken && ($linkTaken->getId() != $filename) )
                {
                    return new JsonResponse([
                        'errorLink' => "Link Taken",
                    ]);
                }
                else{
                    $article->setLink($filename);
                }
            }
            $article->setName($editDonut['edit-name']);
            $article->setDescription($editDonut['edit-description']);
            $article->setQuantity($editDonut['edit-quantity']);
            $article->setAvailability();
            $article->setPrice($editDonut['edit-price']);
            $article->setCarousel($editDonut['edit-carousel']);
            $article->setIsDeleted($editDonut['edit-isdeleted']);

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
}
