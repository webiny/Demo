import Webiny from 'Webiny';
const Ui = Webiny.Ui.Components;

window.createPropsTable = function createPropsTable(component, includeSource = true) {
    const table = [
        '| Name | Description | Type | Default ' + (includeSource ? '| Source |' : '|'),
        '| --- | --- | --- | --- |' + (includeSource ? ' --- |' : '')
    ];

    const rows = {};
    const props = _.omit(component.defaultProps, _.keys(Webiny.Ui.FormComponent.defaultProps).concat(['renderer']));
    _.each(props, (value, name) => {
        let defaultValue = value;
        if (_.isFunction(value)) {
            defaultValue = value === _.noop ? '`_.noop`' : 'function';
        } else {
            defaultValue = _.isPlainObject(value) ? JSON.stringify(value) : value;
        }
        rows[name] = `| ${name} |  | ${typeof value} | ${defaultValue} |${includeSource ? ' user |' : ''}`;
    });

    const keys = Object.keys(rows);
    let i = 0;
    const len = keys.length;

    keys.sort();

    for (i; i < len; i++) {
        table.push(rows[keys[i]]);
    }

    console.log(table.join('\n'));
};

class CustomLayout extends Webiny.Ui.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    downloadSummary(download) {
        const submit = filters => download('GET', '/entities/demo/records/report/summary', null, filters);
        return (
            <Ui.Modal.Dialog ui="exportModal">
                <Ui.Modal.Header title="Export summary"/>
                <Ui.Modal.Body>
                    <Ui.Form ui="exportModalForm" onSubmit={submit}>
                        {() => (
                            <Ui.Grid.Row>
                                <Ui.Grid.Col all={12}>
                                    <Ui.Select name="enabled" label="Filter by status" placeholder="All records" allowClear>
                                        <option value="true">Enabled</option>
                                        <option value="false">Disabled</option>
                                    </Ui.Select>
                                </Ui.Grid.Col>
                            </Ui.Grid.Row>
                        )}
                    </Ui.Form>
                </Ui.Modal.Body>
                <Ui.Modal.Footer align="right">
                    <Ui.Button type="default" label="Cancel" onClick={this.ui('exportModal:hide')}/>
                    <Ui.Button type="primary" label="Export" onClick={this.ui('exportModalForm:submit')}/>
                </Ui.Modal.Footer>
            </Ui.Modal.Dialog>
        );
    }

    render() {
        return (
            <Ui.Form>
                {(model, form) => (
                    <Ui.View.Form>
                        <Ui.View.Body>
                            <Ui.Grid.Row>
                                <Ui.Grid.Col all={6} xsOffset={3} style={{height: 500}}>
                                    <Ui.Downloader ui="downloader"/>
                                    <Ui.Button onClick={this.ui('downloader:download', 'GET', '/entities/demo/records/report/summary')} label="Download report"/>
                                    <Ui.DownloadLink type="secondary" download={this.downloadSummary.bind(this)}>
                                        <Ui.Icon icon="icon-file-o"/> Export summary
                                    </Ui.DownloadLink>
                                    <Ui.DownloadLink type="primary" download="/entities/demo/records/report/summary/csv">
                                        <Ui.Icon icon="icon-file-o"/> Export CSV
                                    </Ui.DownloadLink>
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