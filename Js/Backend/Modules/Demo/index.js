import Webiny from 'webiny';
import Views from './Views/Views';

class Demo extends Webiny.App.Module {

    init() {
        this.name = 'Demo';
        const Menu = Webiny.Ui.Menu;

        this.registerMenus(
            new Menu('Demo', 'Demo.List', 'icon-website')
        );

        this.registerRoutes(
            new Webiny.Route('Demo.Create', '/demo/create', Views.Form, 'Create New Record'),
            new Webiny.Route('Demo.Form', '/demo/:id', Views.Form, 'Edit Record'),
            new Webiny.Route('Demo.List', '/demo', Views.List, 'List Records')
        );
    }
}

export default Demo;