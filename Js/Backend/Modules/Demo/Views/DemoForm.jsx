/* eslint-disable */
import Webiny from 'Webiny';
const Ui = Webiny.Ui.Components;
const UiD = Webiny.Ui.Dispatcher;

class Form extends Webiny.Ui.View {
    constructor(props) {
        super(props);

        this.plugins = [
            new Webiny.Draft.Plugins.Heading(),
            new Webiny.Draft.Plugins.Bold(),
            new Webiny.Draft.Plugins.Italic(),
            new Webiny.Draft.Plugins.Underline(),
            new Webiny.Draft.Plugins.UnorderedList(),
            new Webiny.Draft.Plugins.OrderedList(),
            new Webiny.Draft.Plugins.Alignment(),
            new Webiny.Draft.Plugins.Link(),
            new Webiny.Draft.Plugins.Blockquote(),
            new Webiny.Draft.Plugins.Table(),
            new Webiny.Draft.Plugins.Code(),
            new Webiny.Draft.Plugins.CodeBlock(),
            new Webiny.Draft.Plugins.ToJSON()
        ];

        this.state = {
            preview: false
        };
    }

    render() {
        const formProps = {
            ui: 'myForm',
            api: '/entities/demo/records',
            fields: 'id,createdBy,name,email,contacts,enabled,avatar,datetime,date,time,daterange,access,description,tags,icon,gallery,html,draft,roles,users[id,user.id,user.email]',
            connectToRouter: true,
            onSubmitSuccess: 'Demo.List',
            onCancel: 'Demo.List',
            onProgress: function (pe) {
                const cmp = <div>Uploading form data...{pe.progress}%</div>;
                Webiny.Growl(<Ui.Growl.Warning id={this.growlId} title="Custom progress" sticky={true}>{cmp}</Ui.Growl.Warning>);
            }
        };

        const userRoleSelect = {
            label: 'User role',
            name: 'userRole',
            placeholder: 'Select user role',
            allowClear: true,
            api: '/entities/core/user-roles',
            fields: 'slug,name,id,createdOn',
            perPage: 10,
            optionRenderer: (item) => {
                return (
                    <div>
                        <strong>{item.data.name}</strong><br/>
                        <span>Tag: {item.data.slug}</span>
                    </div>
                );
            },
            selectedRenderer: (item) => {
                return item.data.name;
            },
            onChange: (newValue, oldValue, input) => {
                console.log(newValue, input.getCurrentData());
            }
        };

        const createdBySelect = {
            label: 'Created by',
            name: 'createdBy',
            placeholder: 'Select user',
            allowClear: true,
            api: '/entities/core/users',
            fields: 'id,email',
            valueAttr: 'id',
            textAttr: 'email'
        };

        const recordUsers = {
            label: 'Record users',
            name: 'users',
            api: '/entities/core/users',
            fields: 'id,email',
            textAttr: 'email',
            valueKey: 'user.id',
            formatValue: value => {
                return {user: {id: value.id}};
            }
        };

        const settings = (
            <Ui.Dynamic.Fieldset name="contacts">
                <Ui.Dynamic.Row>
                    {function (record, actions) {
                        return (
                            <Ui.Grid.Row>
                                <Ui.Grid.Col all={3}>
                                    <Ui.Input placeholder="Key" name="key" validate="required"/>
                                </Ui.Grid.Col>
                                <Ui.Grid.Col all={3}>
                                    <Ui.Input placeholder="Value" name="value" validate="required"/>
                                </Ui.Grid.Col>
                                <Ui.Grid.Col all={3}>
                                    <Ui.Select {...createdBySelect} label={null}/>
                                </Ui.Grid.Col>
                                <Ui.Grid.Col all={3}>
                                    <div className="btn-group">
                                        <Ui.Button type="primary" label="Add" onClick={actions.add(record)}/>
                                        <Ui.Button type="secondary" label="x" onClick={actions.remove(record)}/>
                                    </div>
                                </Ui.Grid.Col>
                            </Ui.Grid.Row>
                        );
                    }}
                </Ui.Dynamic.Row>
                <Ui.Dynamic.Empty>
                    {function (actions) {
                        return (
                            <Ui.Grid.Row>
                                <Ui.Grid.Col all={12}>
                                    <h5>You have not created any settings yet. Click "Add settings" to start creating your settings!</h5>
                                    <Ui.Button type="primary" label="Add settings" onClick={actions.add()}/>
                                </Ui.Grid.Col>
                            </Ui.Grid.Row>
                        )
                    }}
                </Ui.Dynamic.Empty>
            </Ui.Dynamic.Fieldset>
        );

        return (
            <Ui.Form {...formProps}>
                {(model, form) => (
                    <Ui.View.Form>
                        <Ui.View.Header title="Demo Form" description="Demo form to demonstrate most of the input components Webiny offers">
                            <Ui.Link type="default" align="right" route="Demo.List">Back to list</Ui.Link>
                            <Ui.Copy.Button onSuccessMessage="Stolen!" type="secondary" icon="icon-pencil" value="You just stole a record!"
                                            label="Steal it..." align="right"/>
                        </Ui.View.Header>
                        <Ui.View.Body noPadding>
                            <Ui.Tabs size="large">
                                <Ui.Tabs.Tab label="Input components" icon="icon-gauge">
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={3}>
                                            <Ui.Input label="Name" name="name" validate="required,minLength:3"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={3}>
                                            <Ui.Input label="Email" name="email" validate="required,email" tooltip="Your email address"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={6}>
                                            <Ui.Search
                                                name="avatar"
                                                textAttr="name"
                                                label="Find file"
                                                api="/entities/core/files"
                                                fields="name,id,createdOn,ref"
                                                searchFields="name"
                                                allowFreeInput={false}
                                                useDataAsValue={false}
                                                filterBy="userRole"
                                                onChange={(newValue, oldValue, input) => console.log(newValue, input)}/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={3}>
                                            <Ui.DateTime label="Date & Time" name="datetime" placeholder="Select date and time"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={3}>
                                            <Ui.Date label="Date" name="date" placeholder="Select a date" validate="required"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={3}>
                                            <Ui.Time label="Time" name="time" placeholder="Select time"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={3}>
                                            <Ui.DateRange label="Date range" name="daterange" placeholder="Select a date range"/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={4}>
                                            <Ui.Select {...userRoleSelect} />
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={4}>
                                            <Ui.Select name="staticSelect" label="Static select" placeholder="Select an option">
                                                <option value="yes">Yes</option>
                                                <option value="no">
                                                    <webiny-no>No</webiny-no>
                                                </option>
                                                <option value="maybe"><strong>Maybe</strong></option>
                                            </Ui.Select>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={4}>
                                            <Ui.Icon.Picker name="icon" label="Your icon"
                                                            allowClear={true} placeholder="Select your icon"/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={6}>
                                            <Ui.Switch label="Enabled" name="enabled"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={6}>
                                            <Ui.Password label="Password" name="password"/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={12}>
                                            <Ui.Copy.Input label="Cron setup"
                                                           value="* * * * * wget http://selecto.app:8001/api/services/cron-manager/runner/run >/dev/null 2>&1"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={12}>
                                            <Ui.Tags name="tags" placeholder="Add tag" label="Tags"/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={12}>
                                            <Ui.Textarea label="Description" name="description" tooltip="Put any tooltip text here..."/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={12}>
                                            <h4>Settings</h4>
                                            {settings}
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                </Ui.Tabs.Tab>
                                <Ui.Tabs.Tab label="Checkboxes" icon="icon-columns">
                                    <Ui.Grid.Row>
                                        {/* CHECKBOXES */}
                                        <Ui.Grid.Col all={6}>
                                            <Ui.Form.Fieldset title="Static checkboxes (hard-coded options)"/>
                                            <Ui.CheckboxGroup name="roles" grid={12}>
                                                <option value="Admin">Admin&nbsp;management</option>
                                                <option value="Coupon">Coupon&nbsp;management</option>
                                                <option value="Crm">CRM</option>
                                                <option value="Dashboard">Dashboard</option>
                                                <option value="anually"><strong>Annually</strong></option>
                                                <option value="monthly">
                                                    <div>Monthly&nbsp;<i>(One season minimum)</i></div>
                                                </option>
                                                <validator name="minLength">Please select at least 2 options</validator>
                                            </Ui.CheckboxGroup>

                                            <div className="clearfix"/>
                                            <Ui.Form.Fieldset title="Single checkbox"/>
                                            <Ui.Checkbox label="Single checkbox" name="singleCheckbox" grid={12} tooltip="Set immediately"/>

                                            <div className="clearfix"/>
                                            <Ui.Form.Fieldset title="Custom checkbox markup (using 'checkboxRenderer' prop)"/>
                                            <Ui.CheckboxGroup name="roles" grid={12} checkboxRenderer={function renderCheckbox() {
                                                return (
                                                    <li className="list-item col-xs-offset-1">
                                                        <div className="form-group">
                                                            <div className="checkbox">
                                                                <input type="checkbox" id={this.id} disabled={this.isDisabled()} checked={this.isChecked()} onChange={this.onChange}/>
                                                                <label htmlFor={this.id}><span className="form-icon"></span>{this.props.label}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            }}>
                                                <option value="Admin">Admin&nbsp;management</option>
                                                <option value="Coupon">Coupon&nbsp;management</option>
                                                <option value="Crm">CRM</option>
                                            </Ui.CheckboxGroup>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={6}>
                                            <Ui.Form.Fieldset title="Dynamic checkboxes for manual aggregation"/>
                                            <Ui.CheckboxGroup {...recordUsers}/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                </Ui.Tabs.Tab>
                                <Ui.Tabs.Tab label="Radio buttons" icon="icon-columns">
                                    <Ui.Grid.Row>
                                        {/* RADIO */}
                                        <Ui.Grid.Col all={6}>
                                            <Ui.RadioGroup label="Roles (static)" name="access" grid={12}>
                                                <option value="Admin">Admin</option>
                                                <option value="Billing">Billing</option>
                                                <option value="Crm">CRM</option>
                                                <option value="Dashboard">Dashboard</option>
                                            </Ui.RadioGroup>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={6}>
                                            <Ui.RadioGroup label="User (API)" name="createdBy" api="/entities/core/users"
                                                           textAttr="email" valueKey="id" grid={12}/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                </Ui.Tabs.Tab>
                                <Ui.Tabs.Tab label="Upload components" icon="icon-picture-1">
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={6}>
                                            <Ui.Files.Avatar name="avatar"/>
                                            <br/>
                                            <Ui.Files.File
                                                name="avatar"
                                                label="Avatar image"
                                                placeholder="Select a file"
                                                description="Any file up to 2.5MB will do"
                                                validate="required"/>
                                        </Ui.Grid.Col>
                                        <Ui.Grid.Col all={6}>
                                            <Ui.Files.Image name="avatar"/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>
                                    <Ui.Grid.Row>
                                        <Ui.Grid.Col all={12}>
                                            <Ui.Files.Gallery
                                                name="gallery"
                                                maxImages={7}
                                                newCropper={{
                                                    title: 'Crop your image',
                                                    action: 'Upload image',
                                                    config: {
                                                        closeOnClick: false,
                                                        autoCropArea: 0.7,
                                                        aspectRatio: 1,
                                                        width: 300,
                                                        height: 300
                                                    }}}/>

                                            <Ui.Files.ImageUploader
                                                onUploadSuccess={image => console.log(image)}
                                                cropper={{
                                                    title: 'Crop your image',
                                                    action: 'Upload image',
                                                    config: {
                                                        aspectRatio: 1,
                                                        closeOnClick: false,
                                                        autoCropArea: 0.7,
                                                        width: 300,
                                                        height: 300
                                                    }}}/>
                                        </Ui.Grid.Col>
                                    </Ui.Grid.Row>

                                </Ui.Tabs.Tab>
                                <Ui.Tabs.Tab label="WYSIWYG" icon="fa-font">
                                    <Ui.HtmlEditor name="html"/>
                                </Ui.Tabs.Tab>
                                <Ui.Tabs.Tab label="Draft Editor" icon="fa-font">
                                    <Ui.Button
                                        label={this.state.preview ? 'Edit' : 'Preview'}
                                        onClick={() => this.setState({preview: !this.state.preview})}/>
                                    <hr/>
                                    <Ui.Draft.Editor
                                        name="draft"
                                        placeholder="Tell a story..."
                                        plugins={this.plugins}
                                        preview={this.state.preview}/>
                                </Ui.Tabs.Tab>
                            </Ui.Tabs>
                        </Ui.View.Body>
                        <Ui.View.Footer>
                            <Ui.Button type="default" onClick={form.cancel} label="Cancel"/>
                            <Ui.Button type="primary" onClick={form.submit} label="Submit" align="right"/>
                        </Ui.View.Footer>
                    </Ui.View.Form>
                )}
            </Ui.Form>
        );
    }
}

export default Form;
