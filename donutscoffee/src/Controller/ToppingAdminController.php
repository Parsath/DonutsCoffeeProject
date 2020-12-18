<?php

namespace App\Controller;

use App\Entity\Topping;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ToppingAdminController extends AbstractController
{


    /**
     * @Route("/admin/topping/new", name="add_topping", methods={"POST"})
     */
    public function add(LoggerInterface $logger, Request $request, EntityManagerInterface $em)
    {
        $topping = new Topping();

        $newTopping = $request->request->all();

        $repository = $em->getRepository(Topping::class);

        /** @var Topping $topping */
        $taken = $repository->findOneBy(
            ['name' => $newTopping['add-name']]
        );

        if($taken)
        {
            return new JsonResponse([
                'errorName' => "Topping already exists",
            ]);
        }
        else{
            $topping->setName($newTopping['add-name']);
            $topping->setIsAvailable($newTopping['add-availability']);
            $topping->setPrice($newTopping['add-price']);
            $topping->setIsDeleted(0);

            $em->persist($topping);
            $em->flush();

            return new JsonResponse([
                'name' => $topping->getName(),
                'slug' => $topping->getSlug(),
                'price' => $topping->getPrice()
            ]);
        }
    }

    /**
     * @Route("/admin/topping/delete/{id}", name="delete_topping", methods={"POST"})
     */
    public function delete($id, Request $request, EntityManagerInterface $em){

        $repository = $em->getRepository(Topping::class);

        /** var Article $article */
        $topping = $repository->findOneBy(
            ['id' => $id]
        );

        if ($topping){
            $toppingName = $topping->getName();

            $em->remove($topping);
            $em->flush();

            return new JsonResponse([
                'name' => $toppingName,
            ]);
        }
        else{
            return new JsonResponse([
                'notFound' => 'Topping Not Found',
            ]);
        }
    }

    /**
     * @Route("/admin/topping/remove/{id}", name="remove_topping", methods={"POST"})
     */
    public function remove($id, Request $request, EntityManagerInterface $em){

        $repository = $em->getRepository(Topping::class);

        /** var Article $article */
        $topping = $repository->findOneBy(
            ['id' => $id]
        );

        if ($topping){
            $toppingName = $topping->getName();

            $topping->setIsDeleted(1);

            $em->persist($topping);
            $em->flush();

            return new JsonResponse([
                'name' => $toppingName,
            ]);
        }
        else{
            return new JsonResponse([
                'notFound' => 'Article Not Found',
            ]);
        }
    }

    /**
     * @Route("/admin/topping/edit/{id}", name="edit_topping")
     */
    public function edit($id, Request $request, EntityManagerInterface $em){

        $repository = $em->getRepository(Topping::class);



        /** var Article $article */
        $topping= $repository->findOneBy(
            ['id' => $id]
        );

        if($request->isMethod('GET')){
            if ($topping){
                return $this->render('topping/edit.html.twig', [
                    'topping' => $topping,
                ]);
            }
            else{
                return new JsonResponse([
                    'notFound' => 'Topping Not Found',
                ]);
            }
        }
        elseif($request->isMethod('POST')){
            $editTopping = $request->request->all();

            /** @var Topping $topping */
            $taken = $repository->findOneBy(
                ['name' => $editTopping['edit-name']]
            );

            if($taken && ($taken->getId() != $editTopping['edit-id']) )
            {
                return new JsonResponse([
                    'errorName' => "Name Taken",
                ]);
            }
            else{
                $topping->setName($editTopping['edit-name']);
                $topping->setIsAvailable($editTopping['edit-availability']);
                $topping->setPrice($editTopping['edit-price']);
                $topping->setIsDeleted($editTopping['edit-isdeleted']);

                $em->persist($topping);
                $em->flush();

                return new JsonResponse([
                    'name' => $topping->getName(),
                    'slug' => $topping->getSlug(),
                    'price' => $topping->getPrice()
                ]);
            }
        }
    }

    /**
     * @Route("/admin/topping/new-topping")
     */
    public function index(EntityManagerInterface $em)
    {
        $topping = new Topping();
        $topping->setName("Kewkew");
        $topping->setPrice(1);
        $topping->setIsAvailable(1);

        $em->persist($topping);
        $em->flush();


        Return new Response(sprintf(
            'New Topping: %d name: %s slug: %s availability: %d price: %d',
            $topping->getId(),
            $topping->getName(),
            $topping->getSlug(),
            $topping->getIsAvailable(),
            $topping->getPrice()
        ));
    }

    /**
     * @Route("/admin/toppings", name="app_admin_toppings")
     */
    public function menu(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Topping::class);

        /** @var Topping $topping */
        $toppings = $repository->findAllOrderedByDeletedArticles();

        return $this->render('admin_pannel/toppings.html.twig', [
            'toppings' => $toppings
        ]);
    }
}
