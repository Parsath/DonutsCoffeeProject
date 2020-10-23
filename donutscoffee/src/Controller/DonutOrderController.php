<?php


namespace App\Controller;


use App\Entity\Article;
use App\Entity\LineItem;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Monolog\Logger;
use Psr\Log\LoggerInterface;
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
    public function orderPage(EntityManagerInterface $em,LoggerInterface $logger)
    {
        $logger->info("Onto Order");
        $repository = $em->getRepository(Article::class);

        /** @var array $articles */
        $articles = $repository->findAllNonDeletedArticles();

//        $articles = $repository->findBy(
//            array('isDeleted' => 0),
//            array('availability' => 1)
//        );

//        $articles->getDoctrine()->getRepository(FormInputs::class)->
//        findBy(
//            array('uid'=>$uid),
//            array('id'=>'DESC')
//        );

//        if(!$articles) {
//            throw $this->createNotFoundException(sprintf('Sorry we\'re actually encountering a problem x_x'));
//        }


        return $this->render('home/order.html.twig', [
            'articles' => $articles,
        ]);
    }

    /**
     * @Route("/order/donut/{slug}", name="article_display", methods={"POST"})
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
            'description' => $article->getDescription(),
            'quantity' => $article->getQuantity(),
        ]);
    }

    /**
     * @Route("/order/pickup", name="order_pickup", methods={"POST"})
     */
    public function pickUpOrder(LoggerInterface $logger,Request $request, EntityManagerInterface $em)
    {
        $donutsArray = $request->get('donutArray');
        $clientName = $request->get('name');
        $clientPhone = $request->get('phone');


        if(!empty($donutsArray))
        {
            $order = new Order();

            $order->setStatus("ongoing");
            $order->setName($clientName);
            $order->setPickup(1);
            $order->setPrice(0);
            $order->setPhone($clientPhone);
            $em->persist($order);
            $em->flush();
            foreach($donutsArray as $donut)
            {
                $lineItem = new LineItem();


                $repository = $em->getRepository(Article::class);
                /** @var Article $article */
                $article = $repository->findOneBy(
                    ['name' => $donut['name']]
                );

                $lineItem->setQuantity($donut['quantity']);
                $lineItem->setOrderArticle($order);
                $lineItem->setArticle($article);
                $lineItem->setPrice();
                $lineItem->setInstructions($donut['instructions']);

                $order->addPrice($lineItem->getPrice());
                $article->decrementQuantity($donut['quantity']);
                $article->setAvailability();

                $em->persist($article);
                $em->persist($lineItem);
                $em->persist($order);

            }
            $em->flush();
        }


        Return new JsonResponse([
                'clientName' => $clientName,
                'clientPhone' => $clientPhone
        ]);
    }

    /**
     * @Route("/order/delivery", name="order_delivery", methods={"POST"})
     */
    public function deliveryOrder(Request $request, EntityManagerInterface $em)
    {
        $donutsArray = $request->get('donutArray');
        $clientName = $request->get('name');
        $clientPhone = $request->get('phone');
        $clientAddress = $request->get('address');
        if(!empty($donutsArray))
        {
            
            $order = new Order();

            $order->setStatus("ongoing");
            $order->setName($clientName);
            $order->setPickup(0);
            $order->setPhone($clientPhone);
            $order->setAddress($clientAddress);
            $em->persist($order);
            $em->flush();

            foreach($donutsArray as $donut)
            {
                $lineItem = new LineItem();


                $repository = $em->getRepository(Article::class);
                /** @var Article $article */
                $article = $repository->findOneBy(
                    ['name' => $donut['name']]
                );

                $lineItem->setQuantity($donut['quantity']);
                $lineItem->setOrderArticle($order);
                $lineItem->setArticle($article);
                $lineItem->setPrice();
                $lineItem->setInstructions($donut['instructions']);

                $order->addPrice($lineItem->getPrice());
                $article->decrementQuantity($donut['quantity']);
                $article->setAvailability();

                $em->persist($article);
                $em->persist($lineItem);
                $em->persist($order);

            }
            $em->flush();
        }


        Return new JsonResponse([
            'clientName' => $clientName,
            'clientPhone' => $clientPhone
        ]);
    }
}