<?php

namespace Apps\Demo\Php\Entities;

use Apps\Webiny\Php\Lib\Entity\AbstractEntity;

/**
 * Class Record2User
 */
class Record2User extends AbstractEntity
{
    protected static $isDiscoverable = false;
    protected static $classId = 'Demo.Entities.Record2User';
    protected static $i18nNamespace = 'Demo.Entities.Record2User';
    protected static $collection = 'DemoRecord2User';

    function __construct()
    {
        parent::__construct();
        $this->attr('record')->many2one()->setEntity(Record::class);
        $this->attr('user')->user();
    }
}