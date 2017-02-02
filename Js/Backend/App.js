import Webiny from 'Webiny';
import DemoModule from './Modules/Demo';

class Demo extends Webiny.App {
    constructor() {
        super('Demo.Backend');
        this.modules = [
            new DemoModule(this)
        ];
    }
}

Webiny.registerApp(new Demo());    