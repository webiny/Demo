<?php

namespace Apps\Demo\Php\Entities;

use Apps\Demo\Php\Reports\ContactsReport;
use Apps\Demo\Php\Reports\RecordsCsv;
use Apps\Webiny\Php\Lib\Api\ApiContainer;
use Apps\Webiny\Php\Lib\Entity\Indexes\IndexContainer;
use Apps\Webiny\Php\Lib\Reports\ReportsArchive;
use Apps\Webiny\Php\Lib\Entity\AbstractEntity;
use Apps\Demo\Php\Reports\BusinessCardReport;
use Apps\Demo\Php\Reports\RecordsReport;
use Apps\NotificationManager\Php\Lib\Recipients\Email;
use Webiny\Component\Mongo\Index\CompoundIndex;

/**
 * Class User
 *
 * @property string $id
 * @property string $name
 * @property string $email
 * @property string $daterange
 * @property string $date
 * @property bool   $enabled
 */
class Record extends AbstractEntity
{
    protected static $classId = 'Demo.Entities.Record';
    protected static $i18nNamespace = 'Demo.Entities.Record';
    protected static $collection = 'DemoRecords';

    public function __construct()
    {
        parent::__construct();

        $this->attr('author')->user();
        $this->attr('assignedTo')->user();
        $this->attr('name')->char()->setValidators('required')->setToArrayDefault();
        $this->attr('description')->char();
        $this->attr('draft')->object();
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
        $this->attr('roles')->arr();
        $this->attr('tags')->arr();
        $this->attr('access')->char();
        $this->attr('avatar')->image()->setDimensions([
            'thumbnail'     => [200, 200],
            'wideThumbnail' => [300, 100],
        ])->setStorage($this->wStorage('Demo'))->setFolder('UserFiles/Avatars')->setOnDelete('cascade');
        $this->attr('gallery')->images()->setStorage($this->wStorage('Demo'))->setFolder('UserFiles/Gallery')->setTags(['demo-gallery']);
        $this->attr('gravatar')->dynamic(function () {
            return md5($this->email);
        });
        $this->attr('reports')->dynamic(function () {
            return [
                'businessCard'      => $this->getApi()->get('{id}/report/business-card')->getUrl($this),
                'emailBusinessCard' => $this->getApi()->post('{id}/report/send')->getUrl($this),
                'contacts'          => $this->getApi()->get('{id}/report/contacts')->getUrl($this)
            ];
        });

        $this->attr('users')->one2many('record')->setEntity(Record2User::class);
    }

    protected function entityApi(ApiContainer $api)
    {
        parent::entityApi($api);

        $api->get('{id}/report/business-card', function () {
            return new BusinessCardReport($this);
        })->setPublic();

        $api->get('{id}/report/contacts', function () {
            return new ContactsReport($this);
        })->setPublic();

        $api->get('report/summary', function () {
            $records = self::find($this->wRequest()->query());

            return new RecordsReport($records);
        })->setPublic();

        $api->post('report/business-cards', function () {
            $query = ['id' => $this->wRequest()->getRequestData()['ids']];
            $records = self::find($query);

            return new ReportsArchive($records, function ($record) {
                return new BusinessCardReport($record);
            }, 'records.zip');
        })->setPublic();

        $api->get('report/summary/csv', function () {
            $records = self::find($this->wRequest()->query());

            return new RecordsCsv($records);
        })->setPublic();

        $api->post('{id}/report/send', function () {
            /* @var \Apps\NotificationManager\Php\Lib\Notification $notification */
            $notification = $this->wService('NotificationManager')->getNotification('demo-record');
            $notification->addEntity($this)->setRecipient(new Email($this->email, $this->name));
            $notification->addCustomVariable('recipient', $this->email);

            $report = new BusinessCardReport($this);
            $pdf = $report->getReport(true);

            $notification->addAttachment($pdf, $report->getFileName() . '.pdf', 'application/pdf');
            $notification->send();
            $pdf->delete();

            return true;
        });
    }

    protected static function entityIndexes(IndexContainer $indexes)
    {
        parent::entityIndexes($indexes);
        $indexes->add(new CompoundIndex('email', ['email', 'deletedOn'], false, true));
    }
}