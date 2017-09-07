<?php

namespace Apps\Demo\Php;

use Apps\Webiny\Php\Entities\User;
use Apps\Webiny\Php\Lib\Apps\App;
use Webiny\Component\Crypt\CryptTrait;

class Bootstrap extends \Apps\Webiny\Php\Lib\LifeCycle\Bootstrap
{
    use CryptTrait;

    public function run(App $app)
    {
        parent::run($app);

        User::onExtend(function (User $user) {
            $user->attr('records')->one2many('user')->setEntity('\Apps\Demo\Php\Entities\Record2User');
        });
    }
}