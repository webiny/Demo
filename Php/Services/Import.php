<?php
namespace Apps\Demo\Php\Services;

use Apps\Webiny\Php\DevTools\Interfaces\PublicApiInterface;
use Apps\Webiny\Php\DevTools\Services\AbstractService;

class Import extends AbstractService implements PublicApiInterface
{
    function __construct()
    {
        parent::__construct();
        $this->api('POST', 'import', function () {
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