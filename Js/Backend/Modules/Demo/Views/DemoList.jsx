import React from 'react';
import _ from 'lodash';
/* eslint-disable */
import Webiny from 'Webiny';

class List extends Webiny.Ui.View {

    log(data, actions) {
        console.log("MULTI ACTION LOG", data);
    }

    render() {
        const {
            View, DownloadLink, List, Modal, Form, Section, Grid, Select, Button, ClickSuccess,
            ClickConfirm, File, Tabs, Dropdown, DateRange, Alert, Link, Icon, Input
        } = this.props;
        return (
            <View.List>
                <View.Header title="Demo List">
                    <DownloadLink type="secondary" align="right" download={download => {
                        const submit = filters => download('GET', '/entities/demo/records/report/summary', filters);
                        return (
                            <Modal.Dialog>
                                {dialog => (
                                    <Form onSubmit={submit}>
                                        {(model, form) => (
                                            <Modal.Content>
                                                <Modal.Header title="Export summary"/>
                                                <Modal.Body>
                                                    <Grid.Row>
                                                        <Grid.Col all={12}>
                                                            <Select
                                                                name="enabled"
                                                                label="Filter by status"
                                                                placeholder="All records"
                                                                allowClear
                                                                tooltip="Filter me">
                                                                <option value="true">Enabled</option>
                                                                <option value="false">Disabled</option>
                                                            </Select>
                                                        </Grid.Col>
                                                    </Grid.Row>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button type="default" label="Cancel" onClick={dialog.hide}/>
                                                    <Button type="primary" label="Export" onClick={form.submit}/>
                                                </Modal.Footer>
                                            </Modal.Content>
                                        )}
                                    </Form>
                                )}
                            </Modal.Dialog>
                        );
                    }}>
                        <Icon icon="icon-file-o"/>
                        Export summary
                    </DownloadLink>
                    <DownloadLink type="secondary" align="right" download="/entities/demo/records/report/summary/csv">
                        <Icon icon="icon-file-o"/>
                        Export CSV
                    </DownloadLink>
                    <Link type="secondary" route="Demo.Create" align="right"><Icon icon="icon-plus-circled"/>Create record</Link>
                </View.Header>
                <View.Body noPadding>
                    <Grid.Row>
                        <Grid.Col xs={12} style={{padding: 20}}>
                            <ClickSuccess message="Simple!" onClose={() => console.log("Me closed!")}>
                                <Button type="primary" label="ClickSuccess" align="right" onClick={() => {
                                }}/>
                            </ClickSuccess>
                            <ClickSuccess message="Hell yeah!">
                                {success => (
                                    <ClickConfirm message="Do you really want to delete this user?" onComplete={success}>
                                        <Button type="primary" label="ClickSuccess with ClickConfirm" align="right" onClick={() => {
                                            return new Promise(r => {
                                                setTimeout(r, 1500);
                                            });
                                        }}/>
                                    </ClickConfirm>
                                )}
                            </ClickSuccess>
                            <ClickConfirm message="Do you really want to delete this user?">
                                <Button type="primary" label="ClickConfirm" align="right" onClick={() => {
                                    return new Promise(r => {
                                        setTimeout(r, 1500);
                                    });
                                }}/>
                            </ClickConfirm>
                            <ClickConfirm message="Do you really want to delete this user?"
                                          renderDialog={(confirm, cancel, confirmation) => {
                                              return (
                                                  <Modal.Dialog onCancel={cancel}>
                                                      <Modal.Content>
                                                          {confirmation.renderLoader()}
                                                          <Modal.Header title="Custom title"/>
                                                          <Modal.Body>
                                                              <p>Some custom dialog body...</p>
                                                          </Modal.Body>
                                                          <Modal.Footer>
                                                              <Button type="primary" label="Confirm" align="right" onClick={confirm}/>
                                                              <Button type="secondary" label="Cancel" align="right" onClick={cancel}/>
                                                          </Modal.Footer>
                                                      </Modal.Content>
                                                  </Modal.Dialog>
                                              );
                                          }}>
                                <Button type="primary" label="ClickConfirm custom dialog" align="right" onClick={() => {
                                    return new Promise(r => {
                                        setTimeout(r, 1500);
                                    });
                                }}/>
                            </ClickConfirm>
                            {/* Import file example */}
                            <ClickConfirm renderDialog={(confirm, cancel, confirmation) => {
                                return (
                                    <Modal.Dialog onCancel={cancel}>
                                        <Form onSubmit={confirm}>
                                            {(model, form) => (
                                                <Modal.Content>
                                                    {confirmation.renderLoader()}
                                                    <Modal.Header title="Select file to import"/>
                                                    <Modal.Body>
                                                        <Grid.Row>
                                                            <Grid.Col all={12}>
                                                                <File
                                                                    accept={['text/csv']}
                                                                    name="records"
                                                                    readAs="binary"
                                                                    label="Import from file"
                                                                    placeholder="Select a CSV file to import"
                                                                    description="Any file up to 2.5MB will do"
                                                                    validate="required"/>
                                                            </Grid.Col>
                                                        </Grid.Row>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button label="Cancel" onClick={cancel}/>
                                                        <Button type="primary" label="Import" onClick={form.submit}/>
                                                    </Modal.Footer>
                                                </Modal.Content>
                                            )}
                                        </Form>
                                    </Modal.Dialog>
                                );
                            }}>
                                <Button type="primary" label="Import file" align="right" onClick={model => {
                                    return new Webiny.Api.Endpoint('/services/demo/import').post('import', model).then(res => {
                                        console.log(res.getData());
                                    })
                                }}/>
                            </ClickConfirm>
                            {/* End of Import file example */}
                        </Grid.Col>
                    </Grid.Row>
                    <Tabs size="large">
                        <Tabs.Tab label="List with table">
                            <List
                                connectToRouter={true}
                                api="/entities/demo/records"
                                sort="email"
                                fields="id,enabled,name,email,createdOn,contacts,reports"
                                searchFields="name,email">
                                <List.Table>
                                    <List.Table.Row>
                                        <List.Table.RowDetailsField/>
                                        <List.Table.Field name="name" align="left" label="Name" sort="name" route="Demo.Form">
                                            <List.Table.FieldInfo title="About name">
                                                <div className="table-responsive">
                                                    <table className="table table-simple">
                                                        <thead>
                                                        <tr>
                                                            <th className="text-left">Label</th>
                                                            <th className="text-left">Description</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td><span className="label label-danger">Inactive</span></td>
                                                            <td>The site is currently not active, meaning you can only access the site
                                                                administration,
                                                                while the public part of the website is not accessible.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><span className="label label-warning">Active but not CNAMEd</span></td>
                                                            <td>Both public part and the administration are active,
                                                                however the public part can only be accessed via the temporary domain.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><span className="label label-success">Active and CNAMEd</span></td>
                                                            <td>Both public part and the administration are active,
                                                                and the domain can be accessed via the user domain.
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </List.Table.FieldInfo>
                                        </List.Table.Field>
                                        <List.Table.Field name="email" align="left" sort="email" label="Email">
                                            <List.Table.FieldInfo title="About email">
                                                <p>
                                                    API Key is used if you wish to make API calls from other websites, or devices, to
                                                    retrieve
                                                    content
                                                    from a particular site.
                                                    Only requests that have the matching API key will get a proper response.
                                                    <br/><br/>
                                                    The API key is sent via <span
                                                    className="label label-default">X-Webiny-Authorization</span>
                                                    HTTP
                                                    request
                                                    header.
                                                    <br/>
                                                </p>
                                            </List.Table.FieldInfo>
                                        </List.Table.Field>
                                        <List.Table.CaseField name="enabled" align="left" label="Status" sort="enabled">
                                            <case value={true}>Enabled</case>
                                            <case value={false}>Disabled</case>
                                        </List.Table.CaseField>
                                        <List.Table.ToggleField name="enabled" align="center" label="Status"/>
                                        <List.Table.Field name="createdOn" align="left" label="Created On" sort="createdOn"/>
                                        <List.Table.DateTimeField name="createdOn" align="left" label="Created On" sort="createdOn"/>
                                        <List.Table.TimeAgoField name="createdOn" align="left" label="Created On" sort="createdOn"/>
                                        <List.Table.Actions>
                                            <List.Table.EditAction route="Demo.Form"/>
                                            <Dropdown.Header title="Reports"/>
                                            <List.Table.Action label="Business Card" icon="icon-doc-text" download={(download, data) => {
                                                download('GET', data.reports.businessCard);
                                            }}/>
                                            <List.Table.Action label="Send to my email" icon="icon-doc-text" download={(download, data) => {
                                                download('POST', data.reports.emailBusinessCard);
                                            }}/>
                                            <List.Table.Action
                                                label="Export contacts"
                                                icon="icon-external-link"
                                                download={(download, record) => {
                                                    const submit = model => download('GET', record.reports.contacts, model);
                                                    return (
                                                        <Modal.Dialog>
                                                            {dialog => (
                                                                <Form onSubmit={submit}>
                                                                    {(model, form) => (
                                                                        <Modal.Content>
                                                                            <Modal.Header title={'Contacts for ' + record.name}/>
                                                                            <Modal.Body>
                                                                                <DateRange
                                                                                    name="range"
                                                                                    label="Filter contacts by date"
                                                                                    placeholder="Select a date range"
                                                                                    validate="required"/>
                                                                                <Alert type="info">
                                                                                    NOTE: this won't filter anything in the report, it's
                                                                                    just here to show you an example of how you would create
                                                                                    a report
                                                                                    configuration dialog in your own app.<br/><br/>
                                                                                    Once you submit the form, see how the parameters are
                                                                                    appended to URL. It is up to you to handle the query
                                                                                    parameters in you
                                                                                    API methods and pass them to report itself or process
                                                                                    the data passed to
                                                                                    the report.
                                                                                </Alert>
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <Button
                                                                                    type="default"
                                                                                    label="Cancel"
                                                                                    onClick={dialog.hide}/>
                                                                                <Button
                                                                                    type="primary"
                                                                                    label="Export"
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
                                        {(data, rowDetails) => {
                                            return (
                                                <List data={data.contacts}>
                                                    <List.Loader/>
                                                    <List.Table>
                                                        <List.Table.Row>
                                                            <List.Table.Field name="key" label="Key"/>
                                                            <List.Table.Field name="value" label="Value"/>
                                                            <List.Table.Field name="createdBy" label="User ID"/>
                                                        </List.Table.Row>
                                                    </List.Table>
                                                </List>
                                            );
                                        }}
                                    </List.Table.RowDetails>
                                </List.Table>
                                <List.Pagination/>
                                <List.MultiActions>
                                    <List.MultiAction label="Log" onAction={this.log}/>
                                    <List.MultiAction label="Export ZIP" download={(download, data) => {
                                        download('POST', '/entities/demo/records/report/business-cards', {ids: _.map(Array.from(data), 'id')})
                                    }}/>
                                    <Dropdown.Divider/>
                                    <List.DeleteMultiAction>
                                        {rows => {
                                            const props = {
                                                message: 'Delete ' + rows.length + ' records?',
                                                onConfirm: this.delete
                                            };
                                            return (
                                                <Modal.Confirmation {...props}/>
                                            );
                                        }}
                                    </List.DeleteMultiAction>
                                    <List.ModalMultiAction label="Modal">
                                        {rows => (
                                            <Modal.Dialog>
                                                {dialog => (
                                                    <Modal.Content>
                                                        <Modal.Header title="Export summary"/>
                                                        <Modal.Body>
                                                            {JSON.stringify(Array.from(rows))}
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button type="default" label="Cancel" onClick={dialog.hide}/>
                                                        </Modal.Footer>
                                                    </Modal.Content>
                                                )}
                                            </Modal.Dialog>
                                        )}
                                    </List.ModalMultiAction>
                                </List.MultiActions>
                            </List>
                        </Tabs.Tab>
                        <Tabs.Tab label="Custom list view">
                            <List
                                api="/entities/demo/records"
                                perPage={3}
                                sort="email"
                                fields="id,enabled,name,email,createdOn"
                                searchFields="name,email"
                                layout={null}>
                                {(data, meta, list) => {
                                    return (
                                        <Grid.Row>
                                            <Grid.Col all={12}>
                                                <Section
                                                    title={`Found a total of ${meta.totalCount} records (showing ${meta.perPage} per page)`}/>
                                            </Grid.Col>
                                            <Grid.Col all={12}>
                                                <List.FormFilters>
                                                    {(apply, reset) => (
                                                        <Grid.Row>
                                                            <Grid.Col all={6}>
                                                                <Select name="enabled" placeholder="All users" onChange={apply()}
                                                                        allowClear>
                                                                    <option value={true}>Enabled</option>
                                                                    <option value={false}>Disabled</option>
                                                                </Select>
                                                            </Grid.Col>
                                                            <Grid.Col all={6}>
                                                                <Input
                                                                    name="_searchQuery"
                                                                    placeholder="Search by name"
                                                                    onEnter={apply()}/>
                                                            </Grid.Col>
                                                        </Grid.Row>
                                                    )}
                                                </List.FormFilters>
                                                <List.Loader/>
                                                <List.Table.Empty renderIf={!data.length}/>
                                                {data.map(row => {
                                                    return (
                                                        <pre key={row.id}>
                                                        <strong>{row.name}</strong> ({row.email})
                                                        <ClickConfirm message="Delete this user?">
                                                            <Link onClick={() => list.recordDelete(row.id)}>
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