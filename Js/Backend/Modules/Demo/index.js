import React from 'react';
import Webiny from 'webiny';
import Views from './Views/Views';

/**
 * @i18n.namespace Demo.Backend.Demo
 */
class Demo extends Webiny.App.Module {

    init() {
        this.name = 'Demo';

        this.registerMenus(
            <Webiny.Ui.Menu label={Webiny.I18n('Demo')} route="Demo.List" icon="icon-website"/>
        );

        this.registerRoutes(
            new Webiny.Route('Demo.Create', '/demo/create', Views.Form, 'Create New Record'),
            new Webiny.Route('Demo.Form', '/demo/:id', Views.Form, 'Edit Record'),
            new Webiny.Route('Demo.List', '/demo', Views.List, 'List Records')
        );
    }
}

export default Demo;