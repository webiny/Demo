<?php
namespace Apps\Demo\Php\Entities;

use Apps\Demo\Php\Reports\ContactsReport;
use Apps\Demo\Php\Reports\RecordsCsv;
use Apps\Webiny\Php\Entities\User;
use Apps\Webiny\Php\Lib\Api\ApiContainer;
use Apps\Webiny\Php\Lib\Entity\Attributes\ImageAttribute;
use Apps\Webiny\Php\Lib\Entity\Attributes\ImagesAttribute;
use Apps\Webiny\Php\Lib\Reports\ReportsArchive;
use Apps\Webiny\Php\Lib\Entity\AbstractEntity;
use Apps\Demo\Php\Reports\BusinessCardReport;
use Apps\Demo\Php\Reports\RecordsReport;
use Apps\NotificationManager\Php\Lib\Recipients\Email;

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
    protected static $entityCollection = 'DemoRecords';

    public function __construct()
    {
        parent::__construct();

        $this->attr('author')->many2one()->setEntity(User::class)->setDefaultValue($this->wAuth()->getUser());
        $this->attr('assignedTo')->many2one()->setEntity(User::class);
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
        $this->attr('avatar')->smart(new ImageAttribute())->setDimensions([
            'thumbnail'     => [200, 200],
            'wideThumbnail' => [300, 100],
        ])->setStorage($this->wStorage('Demo'))->setFolder('UserFiles/Avatars')->setOnDelete('cascade');
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
                'businessCard' => $api->get('{id}/report/business-card')->getUrl(),
                'emailBusinessCard' => $api->post('{id}/report/send')->getUrl(),
                'contacts'     => $api->get('{id}/report/contacts')->getUrl()
            ];
        });

        $this->attr('users')->one2many('record')->setEntity(Record2User::class);
    }

    protected function entityApi(ApiContainer $api)
    {
        parent::entityApi($api);

        $api->get('{id}/report/business-card', function () {
            return new BusinessCardReport($this);
        });

        $api->get('{id}/report/contacts', function () {
            return new ContactsReport($this);
        });

        $api->get('report/summary', function () {
            $records = self::find($this->wRequest()->query());

            return new RecordsReport($records);
        });

        $api->post('report/business-cards', function () {
            $query = ['id' => $this->wRequest()->getRequestData()['ids']];
            $records = self::find($query);

            return new ReportsArchive($records, function ($record) {
                return new BusinessCardReport($record);
            }, 'records.zip');
        });

        $api->get('report/summary/csv', function () {
            $records = self::find($this->wRequest()->query());

            return new RecordsCsv($records);
        });

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
}

/**
 * Class Record2User
 */
class Record2User extends AbstractEntity
{
    protected static $classId = 'Demo.Entities.Record2User';
    protected static $entityCollection = 'DemoRecord2User';

    function __construct()
    {
        parent::__construct();
        $this->attr('record')->many2one()->setEntity(Record::class);
        $this->attr('user')->many2one()->setEntity(User::class);
    }
}