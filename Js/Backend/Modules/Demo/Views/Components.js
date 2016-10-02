import Webiny from 'Webiny';
const Ui = Webiny.Ui.Components;

window.createPropsTable = function (component, includeSource = true) {
    const table = [
        '| Name | Description | Type | Default ' + (includeSource ? '| Source |' : '|'),
        '| --- | --- | --- | --- |' + (includeSource ? ' --- |' : '')
    ];

    const rows = {};
    _.each(component.defaultProps, (value, name) => {
        let defaultValue = value;
        if (_.isFunction(value)) {
            defaultValue = value === _.noop ? '`_.noop`' : 'function';
        } else {
            defaultValue = _.isPlainObject(value) ? JSON.stringify(value) : value
        }
        rows[name] = `| ${name} |  | ${typeof value} | ${defaultValue} |${includeSource ? ' |' : ''}`;
    });

    const keys = Object.keys(rows);
    let i = 0;
    const len = keys.length;

    keys.sort();

    for (i; i < len; i++) {
        table.push(rows[keys[i]]);
    }

    console.log(table.join('\n'))
};

class CustomLayout extends Webiny.Ui.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Ui.Form>
                {model => (
                    <Ui.View.Form>
                        <Ui.View.Body>
                            <Ui.Grid.Row>
                                <Ui.Grid.Col all={6} xsOffset={3}>
                                    <Ui.ChangeConfirm message={value => value ? 'Are you sure you want to turn this switch on?' : null}>
                                        <Ui.Switch name="enabled"/>
                                    </Ui.ChangeConfirm>
                                </Ui.Grid.Col>
                            </Ui.Grid.Row>
                        </Ui.View.Body>
                    </Ui.View.Form>
                )}
            </Ui.Form>
        );
    }
}

export default CustomLayout;