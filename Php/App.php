<?php

namespace Apps\Demo\Php;

use Apps\Demo\Php\Entities\Record2User;
use Apps\Webiny\Php\Entities\User;

class App extends \Apps\Webiny\Php\Lib\Apps\App
{
    public function bootstrap()
    {
        parent::bootstrap();

        User::onExtend(function (User $user) {
            $user->attr('records')->one2many('user')->setEntity(Record2User::class);
        });
    }
}