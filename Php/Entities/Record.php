<?php
namespace Apps\Demo\Php\Entities;

use Apps\Core\Php\DevTools\Entity\Attributes\ImageAttribute;
use Apps\Core\Php\DevTools\Entity\Attributes\ImagesAttribute;
use Apps\Core\Php\DevTools\Reports\ReportsArchive;
use Apps\Core\Php\DevTools\WebinyTrait;
use Apps\Core\Php\DevTools\Entity\AbstractEntity;
use Apps\Demo\Php\Reports\BusinessCardReport;
use Apps\Demo\Php\Reports\ContactsReport;
use Apps\Demo\Php\Reports\RecordsCsv;
use Apps\Demo\Php\Reports\RecordsReport;

/**
 * Class User
 *
 * @property string $id
 * @property string $name
 * @property string $email
 * @property string $daterange
 * @property string $date
 * @property bool   $enabled
 *
 * @package Apps\Core\Php\Entities
 *
 */
class Record extends AbstractEntity
{
    use WebinyTrait;

    protected static $entityCollection = 'DemoRecords';

    public function __construct()
    {
        parent::__construct();

        $this->attr('name')->char()->setValidators('required')->setToArrayDefault();
        $this->attr('description')->char();
        $this->attr('html')->char();
        $this->attr('enabled')->boolean()->setDefaultValue(true);
        $this->attr('email')->char()->setValidators('required,email,unique')->onSet(function ($email) {
            return trim(strtolower($email));
        })->setValidationMessages([
            'unique' => 'Given e-mail address already exists.'
        ])->setToArrayDefault();

        $this->attr('datetime')->datetime();
        $this->attr('date')->date();
        $this->attr('time')->char();
        $this->attr('daterange')->char();
        $this->attr('icon')->char();
        $this->attr('contacts')->arr();
        $this->attr('tags')->arr();
        $this->attr('access')->char();
        $this->attr('avatar')->smart(new ImageAttribute())->setDimensions([
            'thumbnail'     => [200, 200],
            'wideThumbnail' => [300, 100],
        ])->setStorage($this->wStorage('Demo'))->setFolder('UserFiles/Avatars');
        $this->attr('gallery')
             ->smart(new ImagesAttribute())
             ->setStorage($this->wStorage('Demo'))
             ->setFolder('UserFiles/Gallery')
             ->setTags(['demo-gallery']);
        $this->attr('gravatar')->dynamic(function () {
            return md5($this->email);
        });
        $this->attr('reports')->dynamic(function () {
            return [
                'businessCard' => $this->api('GET', '{id}/report/business-card')->getUrl(),
                'contacts'     => $this->api('GET', '{id}/report/contacts')->getUrl()
            ];
        });

        $this->api('GET', '{id}/report/business-card', function () {
            return new BusinessCardReport($this);
        });

        $this->api('GET', '{id}/report/contacts', function () {
            return new ContactsReport($this);
        });

        $this->api('GET', 'report/summary', function () {
            $records = self::find($this->wRequest()->query());

            return new RecordsReport($records);
        });

        $this->api('POST', 'report/business-cards', function () {
            $query = ['id' => $this->wRequest()->getRequestData()['ids']];
            $records = self::find($query);

            return new ReportsArchive($records, function ($record) {
                return new BusinessCardReport($record);
            }, 'records.zip');
        });

        $this->api('GET', 'report/summary/csv', function () {
            $records = self::find($this->wRequest()->query());

            return new RecordsCsv($records);
        });
    }
/*
    public function getSearchValues()
    {
        return [$this->email, $this->name];
    }

    public function getSearchQuery(Search $search)
    {
        if($this->wAuth()->getUser()){
            $search->addQuery(['company' => $company]);
        }
    }*/
}