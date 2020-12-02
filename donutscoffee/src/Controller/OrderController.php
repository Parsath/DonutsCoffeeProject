<?php

namespace App\Controller;

use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{

//    Registers Order as Shipped
    /**
     * @Route("/admin/order/ship/{id}", name="order_ship", methods={"POST"})
     */
    public function ship($id, EntityManagerInterface $em)
    {

        $repository = $em->getRepository(Order::class);

        /** var Order $order */
        $order = $repository->findOneBy(
            ['id' => $id]
        );

        if ($order){

            $order->setUpdatedAt(new \DateTime());
            $order->setStatus("shipped");

            $em->persist($order);
            $em->flush();

            return new JsonResponse([
            ]);
        }
        else{
            return new JsonResponse([
                'notFound' => 'Order Not Found',
            ]);
        }
    }

//    Registers Order as Cancelled
    /**
     * @Route("/admin/order/cancel/{id}", name="order_cancel", methods={"POST"})
     */
    public function cancel($id, EntityManagerInterface $em)
    {

        $repository = $em->getRepository(Order::class);

        /** var Order $order */
        $order = $repository->findOneBy(
            ['id' => $id]
        );

        if ($order){

            $order->setUpdatedAt(new \DateTime());
            $order->setStatus("cancelled");

            $em->persist($order);
            $em->flush();

            return new JsonResponse([
            ]);
        }
        else{
            return new JsonResponse([
                'notFound' => 'Order Not Found',
            ]);
        }
    }

//    Displays order with its details ( Returns Order to Twig)
    /**
     * @Route("/admin/order/show/{id}", name="order_show")
     */
    public function showOrder($id, EntityManagerInterface $em)
    {

        $repository = $em->getRepository(Order::class);

        /** var Order $order */
        $order = $repository->findOneBy(
            ['id' => $id]
        );



        if ($order){

            return $this->render('order/show_order.html.twig', [
                'order' => $order
            ]);

        }
        else{
            return new JsonResponse([
                'notFound' => 'Order Not Found',
            ]);
        }
    }
}
