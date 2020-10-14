<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201014164028 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE line_item ADD order_article_id INT NOT NULL');
        $this->addSql('ALTER TABLE line_item ADD CONSTRAINT FK_9456D6C7C14E7BC9 FOREIGN KEY (order_article_id) REFERENCES `order` (id)');
        $this->addSql('CREATE INDEX IDX_9456D6C7C14E7BC9 ON line_item (order_article_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE line_item DROP FOREIGN KEY FK_9456D6C7C14E7BC9');
        $this->addSql('DROP INDEX IDX_9456D6C7C14E7BC9 ON line_item');
        $this->addSql('ALTER TABLE line_item DROP order_article_id');
    }
}
