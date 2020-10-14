<?php


namespace App\Entity;


abstract class StatusEnum
{
    const ONGOING = "ongoing";
    const SHIPPED = "shipped";
    const CANCELLED = "cancelled";

    /** @var array user friendly named status  */
    protected static $status = [
      self::CANCELLED => 'Cancelled',
      self::ONGOING => 'Ongoing',
      self::SHIPPED => 'Shipped',
    ];

    /**
     * @param string $statusShortName
     * @return string
     */
    public static function getStatusName($statusShortName)
    {
        if(!isset(static::$status[$statusShortName])) {
            return "Unknow type ($statusShortName)";
        }

        return static::$status[$statusShortName];
    }

    /**
     * @return array<string>
     */
    public static function getAvailableStatusNames()
    {
        return [
          self::SHIPPED,
          self::ONGOING,
          self::CANCELLED
        ];
    }

}