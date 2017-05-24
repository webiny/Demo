<?php
namespace Apps\Demo\Php\Reports;

use Apps\Webiny\Php\DevTools\Reports\AbstractPdfReport;
use Apps\Demo\Php\Entities\Record;
use Webiny\Component\Entity\EntityCollection;

/**
 * Class RecordsReport
 * @package Apps\Demo\Php\Reports
 *
 * @property Record $record
 */
class RecordsReport extends AbstractPdfReport
{
    function __construct(EntityCollection $records)
    {
        $this->set('records', $records);
    }

    public function getFileName()
    {
        return 'records-export';
    }
}