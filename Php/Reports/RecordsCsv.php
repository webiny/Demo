<?php
namespace Apps\Demo\Php\Reports;

use Apps\Webiny\Php\DevTools\Entity\AbstractEntity;
use Apps\Webiny\Php\DevTools\Reports\AbstractCsvReport;
use Apps\Demo\Php\Entities\Record;

/**
 * Class RecordsCsv
 * @package Apps\Demo\Php\Reports
 *
 * @property Record $record
 */
class RecordsCsv extends AbstractCsvReport
{
    protected function getHeader()
    {
        return [
            'Name',
            'Email',
            'DateRange',
            'Date'
        ];
    }

    protected function getRow(AbstractEntity $entity)
    {
        /* @var Record $entity */
        return [
            $entity->name,
            $entity->email,
            $entity->daterange,
            $entity->date
        ];
    }

    public function getFileName()
    {
        return $this->str('record-' . date('Ymd'))->slug();
    }
}