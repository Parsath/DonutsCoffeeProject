<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201217174949 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE topping_line_item (id INT AUTO_INCREMENT NOT NULL, topping_id INT NOT NULL, line_item_id INT NOT NULL, INDEX IDX_8E6168E2E9C2067C (topping_id), INDEX IDX_8E6168E2A7CBD339 (line_item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE topping_line_item ADD CONSTRAINT FK_8E6168E2E9C2067C FOREIGN KEY (topping_id) REFERENCES topping (id)');
        $this->addSql('ALTER TABLE topping_line_item ADD CONSTRAINT FK_8E6168E2A7CBD339 FOREIGN KEY (line_item_id) REFERENCES line_item (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE topping_line_item');
    }
}
