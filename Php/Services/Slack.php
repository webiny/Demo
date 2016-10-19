<?php
namespace Apps\Demo\Php\Services;

use Apps\Core\Php\DevTools\Interfaces\PublicApiInterface;
use Apps\Core\Php\DevTools\Services\AbstractService;

class Slack extends AbstractService implements PublicApiInterface
{
    function __construct()
    {
        parent::__construct();
        $this->api('GET', 'message', function () {
            $output = [];
            exec('df -h --local --output=pcent --type=ext4', $output);

            $post = [
                'token'    => 'xoxb-91375422836-9Gl3yoLSq5BBcWoZEJY7AWlL',
                'team'     => 'Webiny',
                'channel'  => '@pavel',
                'username' => 'selecto',
                'as_user'  => true,
                'text'     => 'Disk space used: *' . $output[1] . '*'
            ];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://slack.com/api/chat.postMessage');
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $res = curl_exec($ch);
            curl_close($ch);

            return $res;
        });
    }
}