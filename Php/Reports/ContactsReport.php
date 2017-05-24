<?php
namespace Apps\Demo\Php\Reports;

use Apps\Webiny\Php\DevTools\Reports\AbstractPdfReport;
use Apps\Demo\Php\Entities\Record;

/**
 * Class ContactsReport
 * @package Apps\Demo\Php\Reports
 *
 * @property Record $record
 */
class ContactsReport extends AbstractPdfReport
{
    function __construct(Record $record)
    {
        $this->set('record', $record);
    }

    public function getFileName()
    {
        return $this->str($this->record->name . '-contacts')->slug();
    }
}