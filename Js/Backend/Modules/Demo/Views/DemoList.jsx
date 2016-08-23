/* eslint-disable */
import Webiny from 'Webiny';
import data from './data';
const Ui = Webiny.Ui.Components;
const Table = Ui.List.Table;
const UiD = Webiny.Ui.Dispatcher;
import CustomLayout from './CustomLayout';

class List extends Webiny.Ui.View {

    log(data, actions) {
        console.log("MULTI ACTION LOG", data);
    }

    render() {
        return (
            <Ui.View.List>
                <Ui.View.Header title="Demo List">
                    <Ui.DownloadLink type="secondary" align="right" download={download => {
                        const submit = filters => download('GET', '/entities/demo/records/report/summary', null, filters);
                        return (
                            <Ui.Modal.Dialog ui="exportModal">
                                <Ui.Modal.Header title="Export records"/>
                                <Ui.Modal.Body>
                                    <Ui.Form.Container ui="exportModalForm" onSubmit={submit}>
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
                                    </Ui.Form.Container>
                                </Ui.Modal.Body>
                                <Ui.Modal.Footer align="right">
                                    <Ui.Button type="default" label="Cancel" onClick={this.ui('exportModal:hide')}/>
                                    <Ui.Button type="primary" label="Export" onClick={this.ui('exportModalForm:submit')}/>
                                </Ui.Modal.Footer>
                            </Ui.Modal.Dialog>
                        );
                    }}>
                        <Ui.Icon icon="icon-file-o"/>
                        Export records
                    </Ui.DownloadLink>
                    <Ui.Link type="secondary" route="Demo.Create" align="right"><Ui.Icon icon="icon-plus-circled"/>Create record</Ui.Link>
                    <Ui.ClickSuccess message="Simple!" onClose={() => console.log("Me closed!")}>
                        <Ui.Button type="primary" label="ClickSuccess" align="right" onClick={() => {}}/>
                    </Ui.ClickSuccess>
                    <Ui.ClickSuccess message="Hell yeah!">
                        {success => (
                            <Ui.ClickConfirm message="Do you really want to delete this user?" onComplete={success}>
                                <Ui.Button type="primary" label="ClickSuccess with ClickConfirm" align="right" onClick={() => {
                                    return new Promise(r => {
                                        setTimeout(r, 1500);
                                    });
                                }}/>
                            </Ui.ClickConfirm>
                        )}
                    </Ui.ClickSuccess>
                    <Ui.ClickConfirm message="Do you really want to delete this user?">
                        <Ui.Button type="primary" label="ClickConfirm" align="right" onClick={() => {
                            return new Promise(r => {
                                setTimeout(r, 1500);
                            });
                        }}/>
                    </Ui.ClickConfirm>
                    <Ui.ClickConfirm message="Do you really want to delete this user?" renderDialog={(confirm, cancel, confirmation) => {
                        return (
                            <Ui.Modal.Dialog onCancel={cancel}>
                                {confirmation.renderLoader()}
                                <Ui.Modal.Header title="Custom title"/>
                                <Ui.Modal.Body>
                                    <p>Some custom dialog body...</p>
                                </Ui.Modal.Body>
                                <Ui.Modal.Footer>
                                    <Ui.Button type="primary" label="Confirm" align="right" onClick={confirm}/>
                                    <Ui.Button type="secondary" label="Cancel" align="right" onClick={cancel}/>
                                </Ui.Modal.Footer>
                            </Ui.Modal.Dialog>
                        );
                    }}>
                        <Ui.Button type="primary" label="ClickConfirm custom dialog" align="right" onClick={() => {
                            return new Promise(r => {
                                setTimeout(r, 1500);
                            });
                        }}/>
                    </Ui.ClickConfirm>
                </Ui.View.Header>
                <Ui.View.Body noPadding>
                    <Ui.Tabs.Tabs size="large">
                        <Ui.Tabs.Tab label="List with table">
                            <Ui.List.ApiContainer
                                connectToRouter={true}
                                api="/entities/demo/records"
                                sort="email"
                                fields="id,enabled,name,email,createdOn,contacts,reports"
                                searchFields="name,email">
                                <Table.Table>
                                    <Table.Row>
                                        <Table.RowDetailsField/>
                                        <Table.Field name="name" align="left" label="Name" sort="name" route="Demo.Form">
                                            <Table.FieldInfo title="About name">
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
                                            </Table.FieldInfo>
                                        </Table.Field>
                                        <Table.Field name="email" align="left" sort="email" label="Email">
                                            <Table.FieldInfo title="About email">
                                                <p>
                                                    API Key is used if you wish to make API calls from other websites, or devices, to
                                                    retrieve
                                                    content
                                                    from a particular site.
                                                    Only requests that have the matching API key will get a proper response.
                                                    <br/><br/>
                                                    The API key is sent via <span className="label label-default">X-Webiny-Api-Key</span>
                                                    HTTP
                                                    request
                                                    header.
                                                    <br/>
                                                </p>
                                            </Table.FieldInfo>
                                        </Table.Field>
                                        <Table.CaseField name="enabled" align="left" label="Status" sort="enabled">
                                            <case value={true}>Enabled</case>
                                            <case value={false}>Disabled</case>
                                        </Table.CaseField>
                                        <Table.ToggleField name="enabled" align="center" label="Status"/>
                                        <Table.Field name="createdOn" align="left" label="Created On" sort="createdOn"/>
                                        <Table.DateTimeField name="createdOn" align="left" label="Created On" sort="createdOn"/>
                                        <Table.TimeAgoField name="createdOn" align="left" label="Created On" sort="createdOn"/>
                                        <Table.Actions>
                                            <Table.EditAction route="Demo.Form"/>
                                            <Ui.Dropdown.Header title="Reports"/>
                                            <Table.Action label="Business Card" icon="icon-doc-text" download={(download, data) => {
                                                download('GET', data.reports.businessCard);
                                            }}/>
                                            <Table.Action label="Export contacts" icon="icon-external-link" download={(download, record) => {
                                                const submit = model => download('GET', record.reports.contacts, null, model);
                                                return (
                                                    <Ui.Modal.Dialog ui="exportContactsModal">
                                                        <Ui.Modal.Header title={'Contacts for ' + record.name}/>
                                                        <Ui.Modal.Body>
                                                            <Ui.Form.Container ui="exportModal" onSubmit={submit}>
                                                                {model => (
                                                                    <Ui.DateRange
                                                                        name="range"
                                                                        label="Filter contacts by date"
                                                                        placeholder="Select a date range"
                                                                        validate="required"/>
                                                                )}
                                                            </Ui.Form.Container>
                                                            <Ui.Alert type="info">
                                                                NOTE: this won't filter anything in the report, it's just here to show
                                                                you an example of how you would create a report configuration dialog in
                                                                your own app.<br/><br/>
                                                                Once you submit the form, see how the parameters are appended to URL.
                                                                It is up to you to handle the query parameters in you API methods and
                                                                pass them to report itself or process the data passed to the report.
                                                            </Ui.Alert>
                                                        </Ui.Modal.Body>
                                                        <Ui.Modal.Footer align="right">
                                                            <Ui.Button type="default" label="Cancel" onClick={this.ui('exportContactsModal:hide')}/>
                                                            <Ui.Button type="primary" label="Export" onClick={this.ui('exportModal:submit')}/>
                                                        </Ui.Modal.Footer>
                                                    </Ui.Modal.Dialog>
                                                );
                                            }}/>
                                            <Ui.Dropdown.Divider/>
                                            <Table.DeleteAction/>
                                        </Table.Actions>
                                    </Table.Row>
                                    <Table.RowDetails>
                                        {(data, rowDetails) => {
                                            return (
                                                <Ui.List.StaticContainer data={data.contacts}>
                                                    <Ui.List.Loader/>
                                                    <Table.Table>
                                                        <Table.Row>
                                                            <Table.Field name="key" label="Key"/>
                                                            <Table.Field name="value" label="Value"/>
                                                            <Table.Field name="createdBy" label="User ID"/>
                                                        </Table.Row>
                                                    </Table.Table>
                                                </Ui.List.StaticContainer>
                                            );
                                        }}
                                    </Table.RowDetails>
                                </Table.Table>
                                <Ui.List.Pagination/>
                                <Ui.List.MultiActions>
                                    <Ui.List.MultiAction label="Log" onAction={this.log}/>
                                    <Ui.List.MultiAction label="Export" allowEmpty download={(download, data) => {
                                        const submit = filters => download('GET', '/entities/demo/records/report/summary', null, filters);
                                        return (
                                            <Ui.Modal.Dialog ui="exportModal">
                                                <Ui.Modal.Header title="Export records"/>
                                                <Ui.Modal.Body>
                                                    <Ui.Form.Container ui="exportModalForm" onSubmit={submit}>
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
                                                    </Ui.Form.Container>
                                                </Ui.Modal.Body>
                                                <Ui.Modal.Footer align="right">
                                                    <Ui.Button type="default" label="Cancel" onClick={this.ui('exportModal:hide')}/>
                                                    <Ui.Button type="primary" label="Export" onClick={this.ui('exportModalForm:submit')}/>
                                                </Ui.Modal.Footer>
                                            </Ui.Modal.Dialog>
                                        );
                                    }}/>
                                    <Ui.Dropdown.Divider/>
                                    <Ui.List.DeleteMultiAction>
                                        {rows => {
                                            const props = {
                                                message: 'Delete ' + rows.length + ' records?',
                                                onConfirm: this.delete
                                            };
                                            return (
                                                <Ui.Modal.Confirmation {...props}/>
                                            );
                                        }}
                                    </Ui.List.DeleteMultiAction>
                                </Ui.List.MultiActions>
                            </Ui.List.ApiContainer>
                        </Ui.Tabs.Tab>
                        <Ui.Tabs.Tab label="Custom list view">
                            <Ui.List.ApiContainer
                                api="/entities/demo/records"
                                perPage={3}
                                sort="email"
                                fields="id,enabled,name,email,createdOn"
                                searchFields="name,email"
                                layout={null}>
                                {(data, meta, list) => {
                                    return (
                                        <Ui.Grid.Row>
                                            <Ui.Grid.Col all={12}>
                                                <Ui.Form.Fieldset
                                                    title={`Found a total of ${meta.totalCount} records (showing ${meta.perPage} per page)`}/>
                                            </Ui.Grid.Col>
                                            <Ui.Grid.Col all={12}>
                                                <Ui.List.FormFilters>
                                                    {(apply, reset) => (
                                                        <Ui.Grid.Row>
                                                            <Ui.Grid.Col all={6}>
                                                                <Ui.Select name="enabled" placeholder="All users" onChange={apply()} allowClear>
                                                                    <option value={true}>Enabled</option>
                                                                    <option value={false}>Disabled</option>
                                                                </Ui.Select>
                                                            </Ui.Grid.Col>
                                                            <Ui.Grid.Col all={6}>
                                                                <Ui.Input
                                                                    name="_searchQuery"
                                                                    placeholder="Search by name"
                                                                    onEnter={apply()}/>
                                                            </Ui.Grid.Col>
                                                        </Ui.Grid.Row>
                                                    )}
                                                </Ui.List.FormFilters>
                                                <Ui.List.Loader/>
                                                <Ui.List.Table.Empty renderIf={!data.length}/>
                                                {data.map(row => {
                                                    return (
                                                        <pre key={row.id}>
                                                        <strong>{row.name}</strong> ({row.email})
                                                        <Ui.ClickConfirm message="Delete this user?">
                                                            <Ui.Link onClick={() => list.recordDelete(row.id)}>
                                                                <Ui.Icon icon="icon-cancel"/>
                                                            </Ui.Link>
                                                        </Ui.ClickConfirm>
                                                    </pre>
                                                    );
                                                })}
                                            </Ui.Grid.Col>
                                            <Ui.Grid.Col all={12}>
                                                <Ui.List.Pagination/>
                                            </Ui.Grid.Col>
                                        </Ui.Grid.Row>
                                    );
                                }}
                            </Ui.List.ApiContainer>
                        </Ui.Tabs.Tab>
                    </Ui.Tabs.Tabs>
                </Ui.View.Body>
            </Ui.View.List>
        );
    }
}

export default List;