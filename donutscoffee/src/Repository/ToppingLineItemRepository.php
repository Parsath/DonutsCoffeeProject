<?php

namespace App\Repository;

use App\Entity\ToppingLineItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ToppingLineItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method ToppingLineItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method ToppingLineItem[]    findAll()
 * @method ToppingLineItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ToppingLineItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ToppingLineItem::class);
    }

    // /**
    //  * @return ToppingLineItem[] Returns an array of ToppingLineItem objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ToppingLineItem
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
