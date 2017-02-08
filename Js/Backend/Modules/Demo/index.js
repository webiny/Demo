import Webiny from 'Webiny';
import Views from './Views/Views';

class Demo extends Webiny.Module {

    init() {
        const Menu = Webiny.Ui.Menu;

        this.registerMenus(
            new Menu('Demo', 'Demo.List', 'icon-website')
        );

        this.registerRoutes(
            new Webiny.Route('Demo.Components', '/demo/components', Views.Components, 'Components'),
            new Webiny.Route('Demo.Create', '/demo/create', Views.Form, 'Create New Record'),
            new Webiny.Route('Demo.Form', '/demo/:id', Views.Form, 'Edit Record'),
            new Webiny.Route('Demo.List', '/demo', Views.List, 'List Records')
        );
    }
}

export default Demo;