import Webiny from 'Webiny';
import Views from './Views/Views';

class Module extends Webiny.Module {

    init() {
        const Menu = Webiny.Ui.Menu;

        this.registerMenus(
            new Menu('Demo', 'Demo.List', 'icon-website')
        );

        this.registerRoutes(
            new Webiny.Route('Demo.Form', '/demo/:id', Views.Form),
            new Webiny.Route('Demo.List', '/demo', Views.List)
        );
    }
}

export default Module;