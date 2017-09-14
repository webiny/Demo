<?php
namespace Apps\Demo\Php\Services;

use Apps\Webiny\Php\Lib\Api\ApiContainer;
use Apps\Webiny\Php\Lib\Interfaces\PublicApiInterface;
use Apps\Webiny\Php\Lib\Services\AbstractService;

class Import extends AbstractService implements PublicApiInterface
{
    protected static $classId = 'Demo.Services.Import';

    protected function serviceApi(ApiContainer $api)
    {
        $api->post('import', function () {
            $data = $this->wRequest()->getRequestData();
            $file = $this->str($data['records']['src'])->explode(',')->last()->base64Decode()->val();
            $lines = str_getcsv($file, "\n");
            $json = [];
            $header = str_getcsv(array_shift($lines));
            foreach($lines as $line) {
                $json[] = array_combine($header, str_getcsv($line));
            }
            return $json;
        });
    }

}