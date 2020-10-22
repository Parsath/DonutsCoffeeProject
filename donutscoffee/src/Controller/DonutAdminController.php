<?php


namespace App\Controller;


use App\Entity\Article;
use App\Entity\LineItem;
use App\Entity\Order;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\Request;

class DonutAdminController extends AbstractController
{
    /**
     * @Route("/admin/sidebar", name="sidebar")
     */
    public function sidebarCounter(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(User::class);

        /** @var int $userCount */
        $userCount = $repository->countUsers();

        $repository = $em->getRepository(Article::class);

        /** @var int $articleCount */
        $articleCount = $repository->countArticles();


        $repository = $em->getRepository(Order::class);

        /** @var int $orderCount */
        $orderCount = $repository->countOrders();

        return $this->render('embedded/_sidebar.html.twig', [
            'articleCount' => $articleCount,
            'orderCount' => $orderCount,
            'userCount' => $userCount,
        ]);
    }

    /**
     * @Route("/admin", name="app_dashboard")
     */
    public function dashboard(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(User::class);

        /** @var int $userCount */
        $userCount = $repository->countUsers();

        $repository = $em->getRepository(Article::class);

        /** @var int $articleCount */
        $articleCount = $repository->countArticles();

        $repository = $em->getRepository(Order::class);

        /** @var Order $order */
        $ongoingOrders = $repository->findOnGoingOrderedByNewest();

        /** @var int $orderCount */
        $orderCount = $repository->countOrders();


        return $this->render('admin_pannel/pannel.html.twig', [
            'articleCount' => $articleCount,
            'orderCount' => $orderCount,
            'userCount' => $userCount,
            'ongoingOrders' => $ongoingOrders,
        ]);
    }

    /**
     * @Route("/admin/menu", name="app_admin_menu")
     */
    public function menu(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Article::class);

        /** @var Article $article */
        $articles = $repository->findAll();

        return $this->render('admin_pannel/menu.html.twig', [
            'articles' => $articles
        ]);
    }

    /**
     * @Route("/admin/orders", name="app_admin_orders")
     */
    public function orders(EntityManagerInterface $em, Request $request, PaginatorInterface $paginator)
    {
        $repository = $em->getRepository(Order::class);

        $queryBuilder = $repository->getAllOrderedByNewestQueryBuilder();

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page',1),
            10
        );

        return $this->render('admin_pannel/orders.html.twig', [
            'pagination' => $pagination,
        ]);
    }

    /**
     * @Route("/admin/users", name="app_admin_users")
     */
    public function users(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(User::class);

        /** @var User $user */
        $users = $repository->findAll();

        return $this->render('admin_pannel/users.html.twig',[
            'users' => $users,
        ]);
    }

    /**
     * @Route("/admin/edit", name="app_admin_edit")
     */
    public function edit()
    {
        return $this->render('admin_pannel/edit.html.twig');
    }

    /**
     * @Route("/admin/donut/new")
     */
    public function new(EntityManagerInterface $em)
    {
        $article = new Article();
        $article->setName("Donut 3ejja");
        $article->setPrice(1000.6412);
        $article->setCarousel(1);
        $article->setQuantity(10);
        $article->setAvailability();
        $article->setDescription("Hey I'm Donut Gourmand Description");
        $article->setLink("/images/OrderNow/Salty.jpg");

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
     * @Route("/admin/user/new")
     */
    public function admin(EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = new User();
        $user->setFirstName("Souhaiel");
        $user->setUsername("souhaiel_klay");
        $user->setPassword($passwordEncoder->encodePassword(
            $user,
            "IamtheOwner123Souhaiel"
        ));

        $em->persist($user);
        $em->flush();


        Return new Response();
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
        $lineItem->setInstructions("faddiittt ya iléhi");

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