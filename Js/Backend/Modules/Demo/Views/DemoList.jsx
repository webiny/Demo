import React from 'react';
import _ from 'lodash';
/* eslint-disable */
import Webiny from 'webiny';

/**
 * @i18n.namespace Demo.Backend.Demo.List
 */
class List extends Webiny.Ui.View {

    log({data, actions}) {
        console.log("MULTI ACTION LOG", data, actions);
    }

    delete(params) {
        console.log('DELETE', params);
    }

    render() {
        const {
            View, DownloadLink, List, Modal, Form, Section, Grid, Select, Button, ClickSuccess,
            ClickConfirm, File, Tabs, Dropdown, DateRange, Alert, Link, Icon, Input
        } = this.props;
        return (
            <View.List>
                <View.Header title={this.i18n('Demo List')}>
                    <DownloadLink type="secondary" align="right" download={({download}) => {
                        const submit = ({model: filters}) => download('GET', '/entities/demo/records/report/summary', filters);
                        return (
                            <Modal.Dialog>
                                {({dialog}) => (
                                    <Form onSubmit={submit}>
                                        {({form}) => (
                                            <Modal.Content>
                                                <Modal.Header title={this.i18n('Export summary')}/>
                                                <Modal.Body>
                                                    <Grid.Row>
                                                        <Grid.Col all={12}>
                                                            <Select
                                                                name="enabled"
                                                                label={this.i18n('Filter by status')}
                                                                placeholder={this.i18n('All records')}
                                                                allowClear
                                                                tooltip="Filter me">
                                                                <option value="true">{this.i18n('Enabled')}</option>
                                                                <option value="false">{this.i18n('Disabled')}</option>
                                                            </Select>
                                                        </Grid.Col>
                                                    </Grid.Row>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button type="default" label={this.i18n('Cancel')} onClick={dialog.hide}/>
                                                    <Button type="primary" label={this.i18n('Export')} onClick={form.submit}/>
                                                </Modal.Footer>
                                            </Modal.Content>
                                        )}
                                    </Form>
                                )}
                            </Modal.Dialog>
                        );
                    }}>
                        <Icon icon="icon-file-o"/>
                        {this.i18n('Export summary')}
                    </DownloadLink>
                    <DownloadLink type="secondary" align="right" download="/entities/demo/records/report/summary/csv">
                        <Icon icon="icon-file-o"/>
                        {this.i18n('Export CSV')}
                    </DownloadLink>
                    <Link type="secondary" route="Demo.Create" align="right"><Icon icon="icon-plus-circled"/>{this.i18n('Create record')}</Link>
                </View.Header>
                <View.Body noPadding>
                    <Grid.Row>
                        <Grid.Col xs={12} style={{padding: 20}}>
                            <ClickSuccess message={this.i18n('Simple!')} onClose={() => console.log("Me closed!")}>
                                <Button type="primary" label={this.i18n('ClickSuccess')} align="right" onClick={_.noop}/>
                            </ClickSuccess>
                            <ClickSuccess message={this.i18n('Hell yeah!')}>
                                {({success}) => (
                                    <ClickConfirm message={this.i18n('Do you really want to delete this user?')} onComplete={success}>
                                        <Button type="primary" label={this.i18n('ClickSuccess with ClickConfirm')} align="right"
                                                onClick={() => {
                                                    return new Promise(r => {
                                                        setTimeout(r, 1500);
                                                    });
                                                }}/>
                                    </ClickConfirm>
                                )}
                            </ClickSuccess>
                            <ClickConfirm message={this.i18n('Do you really want to delete this user?')}>
                                <Button type="primary" label={this.i18n('ClickConfirm')} align="right" onClick={() => {
                                    return new Promise(r => {
                                        setTimeout(r, 1500);
                                    });
                                }}/>
                            </ClickConfirm>
                            <ClickConfirm
                                message={this.i18n('Do you really want to delete this user?')}
                                renderDialog={({onConfirm, onCancel, dialog}) => {
                                    return (
                                        <Modal.Dialog onCancel={onCancel}>
                                            <Modal.Content>
                                                {dialog.renderLoader()}
                                                <Modal.Header title={this.i18n('Custom title')}/>
                                                <Modal.Body>
                                                    <p>{this.i18n('Some custom dialog body...')}</p>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button type="primary" label={this.i18n('Confirm')} align="right" onClick={onConfirm}/>
                                                    <Button type="secondary" label={this.i18n('Cancel')} align="right" onClick={onCancel}/>
                                                </Modal.Footer>
                                            </Modal.Content>
                                        </Modal.Dialog>
                                    );
                                }}>
                                <Button type="primary" label={this.i18n('ClickConfirm custom dialog')} align="right" onClick={() => {
                                    return new Promise(r => {
                                        setTimeout(r, 1500);
                                    });
                                }}/>
                            </ClickConfirm>
                            {/* Import file example */}
                            <ClickConfirm renderDialog={({onConfirm, onCancel, dialog}) => {
                                return (
                                    <Modal.Dialog onCancel={onCancel}>
                                        <Form onSubmit={onConfirm}>
                                            {({form}) => (
                                                <Modal.Content>
                                                    {dialog.renderLoader()}
                                                    <Modal.Header title={this.i18n('Select file to import')}/>
                                                    <Modal.Body>
                                                        <Grid.Row>
                                                            <Grid.Col all={12}>
                                                                <File
                                                                    accept={['text/csv']}
                                                                    name="records"
                                                                    readAs="binary"
                                                                    label={this.i18n('Import from file')}
                                                                    placeholder={this.i18n('Select a CSV file to import')}
                                                                    description={this.i18n('Any file up to 2.5MB will do')}
                                                                    validate="required"/>
                                                            </Grid.Col>
                                                        </Grid.Row>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button label={this.i18n('Cancel')} onClick={onCancel}/>
                                                        <Button type="primary" label={this.i18n('Import')} onClick={form.submit}/>
                                                    </Modal.Footer>
                                                </Modal.Content>
                                            )}
                                        </Form>
                                    </Modal.Dialog>
                                );
                            }}>
                                <Button type="primary" label={this.i18n('Import file')} align="right" onClick={({model: data}) => {
                                    return new Webiny.Api.Endpoint('/services/demo/import').post('import', data).then(res => {
                                        console.log(res.getData());
                                    })
                                }}/>
                            </ClickConfirm>
                            {/* End of Import file example */}
                        </Grid.Col>
                    </Grid.Row>
                    <Tabs size="large">
                        <Tabs.Tab label={this.i18n('List with table')}>
                            <List
                                connectToRouter
                                api="/entities/demo/records"
                                sort="email"
                                fields="id,enabled,name,email,createdOn,contacts,reports"
                                searchFields="name,email">
                                <List.Table>
                                    <List.Table.Row>
                                        <List.Table.RowDetailsField/>
                                        <List.Table.Field name="name" align="left" label={this.i18n('Name')} sort="name" route="Demo.Form">
                                            <List.Table.FieldInfo title={this.i18n('About name')}>
                                                <div className="table-responsive">
                                                    <table className="table table-simple">
                                                        <thead>
                                                        <tr>
                                                            <th className="text-left">{this.i18n('Label')}</th>
                                                            <th className="text-left">{this.i18n('Description')}</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td><span className="label label-danger">{this.i18n('Inactive')}</span></td>
                                                            <td>
                                                                {this.i18n(`The site is currently not active, meaning you can only access the site
                                                                administration, while the public part of the website is not accessible.`)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><span className="label label-warning">{this.i18n(`Active but not CNAMEd`)}</span></td>
                                                            <td>
                                                                {this.i18n(`Both public part and the administration are active,
                                                                however the public part can only be accessed via the temporary domain.`)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><span className="label label-success">{this.i18n('Active and CNAMEd')}</span></td>
                                                            <td>
                                                                {this.i18n(`Both public part and the administration are active,
                                                                and the domain can be accessed via the user domain.`)}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </List.Table.FieldInfo>
                                        </List.Table.Field>
                                        <List.Table.Field name="email" align="left" sort="email" label={this.i18n('Email')}>
                                            <List.Table.FieldInfo title={this.i18n('About email')}>
                                                <p>
                                                    {this.i18n(`API Key is used if you wish to make API calls from other websites, or devices, to
                                                    retrieve
                                                    content
                                                    from a particular site.
                                                    Only requests that have the matching API key will get a proper response.`)}
                                                    <br/><br/>
                                                    {this.i18n('The API key is sent via {header} HTTP request header.', {
                                                        header: <span className="label label-default">X-Webiny-Authorization</span>
                                                    })}
                                                    <br/>
                                                </p>
                                            </List.Table.FieldInfo>
                                        </List.Table.Field>
                                        <List.Table.CaseField name="enabled" align="left" label={this.i18n('Status')} sort="enabled">
                                            <case value={true}>{this.i18n('Enabled')}</case>
                                            <case value={false}>{this.i18n('Disabled')}</case>
                                        </List.Table.CaseField>
                                        <List.Table.ToggleField name="enabled" align="center" label={this.i18n('Status')}/>
                                        <List.Table.Field name="createdOn" align="left" label={this.i18n('Created On')} sort="createdOn"/>
                                        <List.Table.DateTimeField name="createdOn" align="left" label={this.i18n('Created On')}
                                                                  sort="createdOn"/>
                                        <List.Table.TimeAgoField name="createdOn" align="left" label={this.i18n('Created On')}
                                                                 sort="createdOn"/>
                                        <List.Table.Actions>
                                            <List.Table.EditAction route="Demo.Form"/>
                                            <Dropdown.Header title={this.i18n('Reports')}/>
                                            <List.Table.Action label={this.i18n('Business Card')} icon="icon-doc-text"
                                                               download={({download, data}) => {
                                                                   download('GET', data.reports.businessCard);
                                                               }}/>
                                            <List.Table.Action label={this.i18n('Send to my email')} icon="icon-doc-text"
                                                               download={({download, data}) => {
                                                                   download('POST', data.reports.emailBusinessCard);
                                                               }}/>
                                            <List.Table.Action
                                                label={this.i18n('Export contacts')}
                                                icon="icon-external-link"
                                                download={({download, record}) => {
                                                    const submit = ({model}) => download('GET', record.reports.contacts, model);
                                                    return (
                                                        <Modal.Dialog>
                                                            {({dialog}) => (
                                                                <Form onSubmit={submit}>
                                                                    {({form}) => (
                                                                        <Modal.Content>
                                                                            <Modal.Header title={'Contacts for ' + record.name}/>
                                                                            <Modal.Body>
                                                                                <DateRange
                                                                                    name="range"
                                                                                    label={this.i18n('Filter contacts by date')}
                                                                                    placeholder={this.i18n('Select a date range')}
                                                                                    validate="required"/>
                                                                                <Alert type="info">
                                                                                    {this.i18n(`NOTE: this won't filter anything in the report, it's
                                                                                    just here to show you an example of how you would create
                                                                                    a report
                                                                                    configuration dialog in your own app.`)}
                                                                                    <br/><br/>
                                                                                    {this.i18n(`Once you submit the form, see how the parameters are
                                                                                    appended to URL. It is up to you to handle the query
                                                                                    parameters in you
                                                                                    API methods and pass them to report itself or process
                                                                                    the data passed to
                                                                                    the report.`)}
                                                                                </Alert>
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <Button
                                                                                    type="default"
                                                                                    label={this.i18n('Cancel')}
                                                                                    onClick={dialog.hide}/>
                                                                                <Button
                                                                                    type="primary"
                                                                                    label={this.i18n('Export')}
                                                                                    onClick={form.submit}/>
                                                                            </Modal.Footer>
                                                                        </Modal.Content>
                                                                    )}
                                                                </Form>
                                                            )}
                                                        </Modal.Dialog>
                                                    );
                                                }}/>
                                            <Dropdown.Divider/>
                                            <List.Table.DeleteAction/>
                                        </List.Table.Actions>
                                    </List.Table.Row>
                                    <List.Table.RowDetails>
                                        {({data}) => {
                                            return (
                                                <List data={data.contacts}>
                                                    <List.Loader/>
                                                    <List.Table>
                                                        <List.Table.Row>
                                                            <List.Table.Field name="key" label={this.i18n('Key')}/>
                                                            <List.Table.Field name="value" label={this.i18n('Value')}/>
                                                            <List.Table.Field name="createdBy" label={this.i18n('User ID')}/>
                                                        </List.Table.Row>
                                                    </List.Table>
                                                </List>
                                            );
                                        }}
                                    </List.Table.RowDetails>
                                </List.Table>
                                <List.Pagination/>
                                <List.MultiActions>
                                    <List.MultiAction label={this.i18n('Log')} onAction={this.log}/>
                                    <List.MultiAction label={this.i18n('Export ZIP')} download={({download, data}) => {
                                        download('POST', '/entities/demo/records/report/business-cards', {ids: _.map(Array.from(data), 'id')})
                                    }}/>
                                    <Dropdown.Divider/>
                                    <List.DeleteMultiAction
                                        onConfirm={this.delete}
                                        message={({data}) => 'Delete ' + data.length + ' records?'}/>
                                    <List.ModalMultiAction label={this.i18n('Modal')}>
                                        {({data, dialog}) => (
                                            <Modal.Dialog>
                                                <Modal.Content>
                                                    <Modal.Header title={this.i18n('Export summary')}/>
                                                    <Modal.Body>
                                                        {JSON.stringify(Array.from(data))}
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button type="default" label={this.i18n('Cancel')} onClick={dialog.hide}/>
                                                    </Modal.Footer>
                                                </Modal.Content>
                                            </Modal.Dialog>
                                        )}
                                    </List.ModalMultiAction>
                                </List.MultiActions>
                            </List>
                        </Tabs.Tab>
                        <Tabs.Tab label={this.i18n('Custom list view')}>
                            <List
                                api="/entities/demo/records"
                                perPage={3}
                                sort="email"
                                fields="id,enabled,name,email,createdOn"
                                searchFields="name,email"
                                layout={null}>
                                {({list, meta, $this}) => {
                                    return (
                                        <Grid.Row>
                                            <Grid.Col all={12}>
                                                <Section
                                                    title={this.i18n('Found a total of {totalCount} records (showing {perPage} per page)', {
                                                        totalCount: meta.totalCount,
                                                        perPage: meta.perPage
                                                    })}/>
                                            </Grid.Col>
                                            <Grid.Col all={12}>
                                                <List.FormFilters>
                                                    {({apply, reset}) => (
                                                        <Grid.Row>
                                                            <Grid.Col all={6}>
                                                                <Select
                                                                    name="enabled"
                                                                    placeholder={this.i18n('All users')}
                                                                    onChange={apply()}
                                                                    allowClear>
                                                                    <option value={true}>{this.i18n('Enabled')}</option>
                                                                    <option value={false}>{this.i18n('Disabled')}</option>
                                                                </Select>
                                                            </Grid.Col>
                                                            <Grid.Col all={6}>
                                                                <Input
                                                                    name="_searchQuery"
                                                                    placeholder={this.i18n('Search by name')}
                                                                    onEnter={apply()}/>
                                                            </Grid.Col>
                                                        </Grid.Row>
                                                    )}
                                                </List.FormFilters>
                                                <List.Loader/>
                                                <List.Table.Empty renderIf={!list.length}/>
                                                {list.map(row => {
                                                    return (
                                                        <pre key={row.id}>
                                                        <strong>{row.name}</strong> ({row.email})
                                                        <ClickConfirm message={this.i18n('Delete this user?')}>
                                                            <Link onClick={() => $this.recordDelete(row.id)}>
                                                                <Icon icon="icon-cancel"/>
                                                            </Link>
                                                        </ClickConfirm>
                                                    </pre>
                                                    );
                                                })}
                                            </Grid.Col>
                                            <Grid.Col all={12}>
                                                <List.Pagination/>
                                            </Grid.Col>
                                        </Grid.Row>
                                    );
                                }}
                            </List>
                        </Tabs.Tab>
                    </Tabs>
                </View.Body>
            </View.List>
        );
    }
}

export default Webiny.createComponent(List, {
    modules: [
        'View', 'DownloadLink', 'List', 'Modal', 'Form', 'Section', 'Grid', 'Select', 'Button', 'ClickSuccess',
        'ClickConfirm', 'File', 'Tabs', 'Dropdown', 'DateRange', 'Alert', 'Link', 'Icon', 'Input'
    ]
});