import Webiny from 'Webiny';

class CustomLayout extends Webiny.Ui.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    downloadSummary(download) {
        const submit = filters => download('GET', '/entities/demo/records/report/summary', null, filters);
        const {Modal, Form, Grid, Select, Button} = this.props;
        return (
            <Modal.Dialog ui="exportModal">
                <Modal.Header title="Export summary"/>
                <Modal.Body>
                    <Form ui="exportModalForm" onSubmit={submit}>
                        {() => (
                            <Grid.Row>
                                <Grid.Col all={12}>
                                    <Select name="enabled" label="Filter by status" placeholder="All records" allowClear>
                                        <option value="true">Enabled</option>
                                        <option value="false">Disabled</option>
                                    </Select>
                                </Grid.Col>
                            </Grid.Row>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer align="right">
                    <Button type="default" label="Cancel" onClick={this.ui('exportModal:hide')}/>
                    <Button type="primary" label="Export" onClick={this.ui('exportModalForm:submit')}/>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }

    render() {
        const {Form, View, Grid, Downloader, Button, DownloadLink, Icon} = this.props;
        return (
            <Form>
                {(model, form) => (
                    <View.Form>
                        <View.Body>
                            <Grid.Row>
                                <Grid.Col all={6} xsOffset={3} style={{height: 500}}>
                                    <Downloader ui="downloader"/>
                                    <Button onClick={this.ui('downloader:download', 'GET', '/entities/demo/records/report/summary')} label="Download report"/>
                                    <DownloadLink type="secondary" download={this.downloadSummary.bind(this)}>
                                        <Icon icon="icon-file-o"/> Export summary
                                    </DownloadLink>
                                    <DownloadLink type="primary" download="/entities/demo/records/report/summary/csv">
                                        <Icon icon="icon-file-o"/> Export CSV
                                    </DownloadLink>
                                </Grid.Col>
                            </Grid.Row>
                        </View.Body>
                    </View.Form>
                )}
            </Form>
        );
    }
}

export default Webiny.createComponent(CustomLayout, {modules: [
    'Form', 'View', 'Grid', 'Downloader', 'Button', 'DownloadLink', 'Icon', 'Modal', 'Select'
]});