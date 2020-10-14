<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201014163713 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE line_item ADD article_id INT NOT NULL');
        $this->addSql('ALTER TABLE line_item ADD CONSTRAINT FK_9456D6C77294869C FOREIGN KEY (article_id) REFERENCES article (id)');
        $this->addSql('CREATE INDEX IDX_9456D6C77294869C ON line_item (article_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE line_item DROP FOREIGN KEY FK_9456D6C77294869C');
        $this->addSql('DROP INDEX IDX_9456D6C77294869C ON line_item');
        $this->addSql('ALTER TABLE line_item DROP article_id');
    }
}
