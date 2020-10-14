<?php


namespace App\Controller;


use App\Entity\Article;
use App\Entity\LineItem;
use App\Entity\Order;
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
        $article->setName("Donut Gourmand");
        $article->setPrice(4.00);
        $article->setCarousel(1);
        $article->setAvailability(1);
        $article->setQuantity(30);
        $article->setDescription("Hey I'm Donut Gourmand Description");
        $article->setLink("/images/OrderNow/Donut Gourmand.jpg");

        $em->persist($article);
        $em->flush();


        Return new Response(sprintf(
            'New Article: %d name: %s price: %d',
            $article->getId(),
            $article->getName(),
            $article->getPrice()
        ));
    }

    /**
     * @Route("/admin/order/new")
     */
    public function newOrder(EntityManagerInterface $em)
    {
        $order = new Order();
        $order->setName("Fat7i");
        $order->setAddress("7ay Wejh el Lou7 3");
        $order->setPickup(1);
        $order->setStatus("shipped");

        $em->persist($order);
        $em->flush();

        Return new Response(sprintf(
            "Name: %s, Address: %s, Pickup: %d, Status: %s",
            $order->getName(),
            $order->getAddress(),
            $order->getPickup(),
            $order->getStatus()
        ));

    }

    /**
     * @Route("/admin/line-item/new")
     */
    public function newLineItem(EntityManagerInterface $em, Article $article,Order $order)
    {
//        ADD : ", Article $article,Order $order"

        $lineItem = new LineItem();


//        $repository = $em->getRepository(Article::class);
//
//        /** @var Article $article */
//        $article = $repository->findOneBy(
//            ['availability' => 1]
//        );
//
//        $repository = $em->getRepository(Order::class);
//
//        /** @var Order $order */
//        $order = $repository->findOneBy(
//            ['pickup' => 1]
//        );

        $lineItem->setQuantity(13);
        $lineItem->setOrderArticle($order);
        $lineItem->setArticle($article);
        $lineItem->setPrice();
        $lineItem->setInstructions("barra nayek");

        $em->persist($lineItem);
        $em->flush();

        Return new Response(sprintf(
            'LineItem: %d \n Order Id: %d \n Article Id: %d \n Article Price: %d \n Line Item Quantity: %d \n Line Item price: %d \n Line Item Instructions : %s',
            $lineItem->getId(),
            $order->getId(),
            $article->getId(),
            $article->getPrice(),
            $lineItem->getQuantity(),
            $lineItem->getPrice(),
            $lineItem->getInstructions()
        ));
    }
}