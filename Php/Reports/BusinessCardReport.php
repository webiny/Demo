<?php
namespace Apps\Demo\Php\Reports;

use Apps\Core\Php\DevTools\Reports\AbstractPdfReport;
use Apps\Demo\Php\Entities\Record;

/**
 * Class BusinessCardReport
 * @package Apps\Demo\Php\Reports
 *
 * @property Record $record
 */
class BusinessCardReport extends AbstractPdfReport
{
    function __construct(Record $record)
    {
        $this->set('record', $record);
    }

    public function getFileName()
    {
        return $this->str($this->record->name)->slug();
    }
}