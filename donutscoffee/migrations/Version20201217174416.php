<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201217174416 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE topping DROP FOREIGN KEY FK_81AA94E7A7CBD339');
        $this->addSql('DROP INDEX IDX_81AA94E7A7CBD339 ON topping');
        $this->addSql('ALTER TABLE topping DROP line_item_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE topping ADD line_item_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE topping ADD CONSTRAINT FK_81AA94E7A7CBD339 FOREIGN KEY (line_item_id) REFERENCES line_item (id)');
        $this->addSql('CREATE INDEX IDX_81AA94E7A7CBD339 ON topping (line_item_id)');
    }
}
