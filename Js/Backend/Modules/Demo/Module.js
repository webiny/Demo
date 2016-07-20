import Webiny from 'Webiny';
import Views from './Views/Views';

class Module extends Webiny.Module {

    init() {
        const Menu = Webiny.Ui.Menu;

        this.registerMenus(
            new Menu('Demo', 'Demo.List', 'icon-website'),
            new Menu('Settings', [
                new Menu('Demo', 'Demo.Settings')
            ], 'icon-cog')
        );

        this.registerRoutes(
            new Webiny.Route('Demo.Form', '/demo/:id', Views.Form),
            new Webiny.Route('Demo.List', '/demo', Views.List),
            new Webiny.Route('Demo.Settings', '/settings/demo', Views.Settings, 'Demo Settings')
        );
    }
}

export default Module;