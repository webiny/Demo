import React from 'react';
/* eslint-disable */
import Webiny from 'webiny';

class Form extends Webiny.Ui.View {
    constructor(props) {
        super(props);

        const {Draft} = props;

        this.plugins = [
            new Draft.Plugins.Heading(),
            new Draft.Plugins.Bold(),
            new Draft.Plugins.Italic(),
            new Draft.Plugins.Underline(),
            new Draft.Plugins.UnorderedList(),
            new Draft.Plugins.OrderedList(),
            new Draft.Plugins.Alignment(),
            new Draft.Plugins.Link(),
            new Draft.Plugins.Blockquote(),
            new Draft.Plugins.Table(),
            new Draft.Plugins.Code(),
            new Draft.Plugins.Video(),
            new Draft.Plugins.CodeBlock(),
            new Draft.Plugins.ToJSON()
        ];

        this.state = {
            preview: false
        };
    }

    render() {
        const {
            Growl, Dynamic, Grid, Input, Email, Button, Select, Form, View, Link, Copy, Tabs, Search, DateTime, Date, Time, DateRange,
            IconPicker, Switch, Password, Tags, Textarea, CheckboxGroup, Section, Checkbox, RadioGroup, Avatar, File, Image, Gallery,
            Draft, HtmlEditor, ButtonGroup, MarkdownEditor
        } = this.props;

        const formProps = {
            api: '/entities/demo/records',
            fields: 'id,createdBy,assignedTo.id,name,email,contacts,enabled,avatar,datetime,date,time,daterange,access,description,tags,icon,gallery,html,draft,roles,users[id,user.id,user.email]',
            connectToRouter: true,
            onSubmitSuccess: 'Demo.List',
            onCancel: 'Demo.List',
            onProgress: function (pe) {
                const cmp = <div>Uploading form data...{pe.progress}%</div>;
                Webiny.Growl(<Growl.Warning id={this.growlId} title="Custom progress" sticky={true}>{cmp}</Growl.Warning>);
            }
        };

        const userRoleSelect = {
            label: 'User role',
            name: 'userRole',
            placeholder: 'Select user role',
            allowClear: true,
            api: '/entities/webiny/user-roles',
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
            api: '/entities/webiny/users',
            fields: 'id,email',
            valueAttr: 'id',
            textAttr: 'email'
        };

        const recordUsers = {
            label: 'Record users',
            name: 'users',
            api: '/entities/webiny/users',
            fields: 'id,email',
            textAttr: 'email',
            valueKey: 'user.id', // Used to map API options to form model
            useDataAsValue: true,
            formatOptionValue: value => {
                return {user: {id: value.id}};
            }
        };

        const settings = (
            <Dynamic.Fieldset name="contacts">
                <Dynamic.Row>
                    {({data, actions}) => {
                        return (
                            <Grid.Row>
                                <Grid.Col all={3}>
                                    <Input placeholder="Key" name="key" validate="required"/>
                                </Grid.Col>
                                <Grid.Col all={3}>
                                    <Input placeholder="Value" name="value" validate="required"/>
                                </Grid.Col>
                                <Grid.Col all={3}>
                                    <Select {...createdBySelect} label={null}/>
                                </Grid.Col>
                                <Grid.Col all={3}>
                                    <ButtonGroup>
                                        <Button type="primary" label="Add" onClick={actions.add(data)}/>
                                        <Button type="secondary" label="x" onClick={actions.remove(data)}/>
                                    </ButtonGroup>
                                </Grid.Col>
                            </Grid.Row>
                        );
                    }}
                </Dynamic.Row>
                <Dynamic.Empty>
                    {({actions}) => (
                        <Grid.Row>
                            <Grid.Col all={12}>
                                <h5>You have not created any settings yet. Click "Add settings" to start creating your settings!</h5>
                                <Button type="primary" label="Add settings" onClick={actions.add()}/>
                            </Grid.Col>
                        </Grid.Row>
                    )}
                </Dynamic.Empty>
            </Dynamic.Fieldset>
        );

        return (
            <Form {...formProps}>
                {({form}) => (
                    <View.Form>
                        <View.Header title="Demo Form" description="Demo form to demonstrate most of the input components Webiny offers">
                            <Link type="default" align="right" route="Demo.List">Back to list</Link>
                            <Copy.Button
                                onSuccessMessage="Stolen!"
                                type="secondary"
                                icon="icon-pencil"
                                value="You just stole a record!"
                                label="Steal it..."
                                align="right"/>
                        </View.Header>
                        <View.Body noPadding>
                            <Tabs size="large">
                                <Tabs.Tab label="Input components" icon="icon-gauge">
                                    <Grid.Row>
                                        <Grid.Col all={3}>
                                            <Input label="Name" name="name" validate="required,minLength:3"/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <Email label="Email" name="email" validate="required" tooltip="Your email address"/>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <Search
                                                name="avatar"
                                                textAttr="name"
                                                label="Find file"
                                                api="/entities/webiny/files"
                                                fields="name,id,createdOn,ref"
                                                searchFields="name"
                                                allowFreeInput={false}
                                                validate="required"
                                                useDataAsValue={false}
                                                filterBy="userRole"
                                                onChange={(newValue, oldValue, input) => console.log(newValue, input)}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={3}>
                                            <DateTime label="Date & Time" name="datetime" placeholder="Select date and time"/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <Date label="Date" name="date" placeholder="Select a date" validate="required"/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <Time label="Time" name="time" placeholder="Select time"/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <DateRange label="Date range" name="daterange" placeholder="Select a date range"/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={4}>
                                            <Select {...userRoleSelect} />
                                        </Grid.Col>
                                        <Grid.Col all={4}>
                                            <Select name="staticSelect" label="Static select" placeholder="Select an option">
                                                <option value="yes">Yes</option>
                                                <option value="no">
                                                    <webiny-no>No</webiny-no>
                                                </option>
                                                <option value="maybe"><strong>Maybe</strong></option>
                                            </Select>
                                        </Grid.Col>
                                        <Grid.Col all={4}>
                                            <IconPicker name="icon" label="Your icon"
                                                        allowClear={true} placeholder="Select your icon"/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={6}>
                                            <Switch label="Enabled" name="enabled"/>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <Password label="Password" name="password"/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={12}>
                                            <Copy.Input label="Cron setup"
                                                        value="* * * * * wget http://selecto.app:8001/api/services/cron-manager/runner/run >/dev/null 2>&1"/>
                                        </Grid.Col>
                                        <Grid.Col all={12}>
                                            <Tags name="tags" placeholder="Add tag" label="Tags"/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={12}>
                                            <Textarea label="Description" name="description" tooltip="Put any tooltip text here..."/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={12}>
                                            <h4>Settings</h4>
                                            {settings}
                                        </Grid.Col>
                                    </Grid.Row>
                                </Tabs.Tab>
                                <Tabs.Tab label="Checkboxes" icon="icon-columns">
                                    <Grid.Row>
                                        {/* CHECKBOXES */}
                                        <Grid.Col all={6}>
                                            <Section title="Static checkboxes (hard-coded options)"/>
                                            <CheckboxGroup name="roles" validate="minLength:2">
                                                <option value="Admin">Admin&nbsp;management</option>
                                                <option value="Coupon">Coupon&nbsp;management</option>
                                                <option value="Crm">CRM</option>
                                                <option value="Dashboard">Dashboard</option>
                                                <option value="anually"><strong>Annually</strong></option>
                                                <option value="monthly">
                                                    <div>Monthly&nbsp;<i>(One season minimum)</i></div>
                                                </option>
                                                <validator name="minLength">Please select at least 2 options</validator>
                                            </CheckboxGroup>

                                            <div className="clearfix"/>
                                            <Section title="Single checkbox"/>
                                            <Checkbox label="Single checkbox" name="singleCheckbox" tooltip="Set immediately"/>

                                            <div className="clearfix"/>
                                            <Section title="Custom checkbox markup (using 'checkboxRenderer' prop)"/>
                                            <CheckboxGroup name="roles" checkboxRenderer={function renderCheckbox() {
                                                return (
                                                    <li className="list-item col-xs-offset-1">
                                                        <div className="form-group">
                                                            <div className="checkbox">
                                                                <input type="checkbox" id={this.id} disabled={this.isDisabled()}
                                                                       checked={this.isChecked()} onChange={this.onChange}/>
                                                                <label htmlFor={this.id}><span className="form-icon"/>{this.props.label}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            }}>
                                                <option value="Admin">Admin&nbsp;management</option>
                                                <option value="Coupon">Coupon&nbsp;management</option>
                                                <option value="Crm">CRM</option>
                                            </CheckboxGroup>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <Section title="Dynamic checkboxes for manual aggregation"/>
                                            <CheckboxGroup {...recordUsers}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                </Tabs.Tab>
                                <Tabs.Tab label="Radio buttons" icon="icon-columns">
                                    <Grid.Row>
                                        {/* RADIO */}
                                        <Grid.Col all={6}>
                                            <RadioGroup label="Roles (static)" name="access">
                                                <option value="Admin">Admin</option>
                                                <option value="Billing">Billing</option>
                                                <option value="Crm">CRM</option>
                                                <option value="Dashboard">Dashboard</option>
                                            </RadioGroup>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <RadioGroup
                                                label="User (API)"
                                                name="assignedTo"
                                                api="/entities/webiny/users"
                                                textAttr="email"
                                                useDataAsValue={true}
                                                onChange={newValue => {
                                                    console.log('Assigned to', newValue);
                                                }}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                </Tabs.Tab>
                                <Tabs.Tab label="Upload components" icon="icon-picture-1">
                                    <Grid.Row>
                                        <Grid.Col all={6}>
                                            <Avatar name="avatar"/>
                                            <br/>
                                            <File
                                                name="avatar"
                                                label="Avatar image"
                                                placeholder="Select a file"
                                                description="Any file up to 2.5MB will do"
                                                validate="required"/>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <Image name="avatar"/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={12}>
                                            <Gallery
                                                name="gallery"
                                                maxImages={7}
                                                newCropper={{
                                                    title: 'Crop your image',
                                                    action: 'Upload image',
                                                    config: {
                                                        closeOnClick: false,
                                                        autoCropArea: 0.7,
                                                        // aspectRatio: 1,
                                                        width: 300,
                                                        height: 300
                                                    }
                                                }}/>
                                        </Grid.Col>
                                    </Grid.Row>

                                </Tabs.Tab>
                                <Tabs.Tab label="WYSIWYG" icon="fa-font">
                                    <HtmlEditor name="html"/>
                                    <MarkdownEditor name="markdown"/>
                                </Tabs.Tab>
                                <Tabs.Tab label="Draft Editor" icon="fa-font">
                                    <Button
                                        label={this.state.preview ? 'Edit' : 'Preview'}
                                        onClick={() => this.setState({preview: !this.state.preview})}/>
                                    <hr/>
                                    <Draft.Editor
                                        name="draft"
                                        placeholder="Tell a story..."
                                        plugins={this.plugins}
                                        preview={this.state.preview}/>
                                </Tabs.Tab>
                            </Tabs>
                        </View.Body>
                        <View.Footer>
                            <Button type="default" onClick={form.cancel} label="Cancel"/>
                            <Button type="primary" onClick={form.submit} label="Submit" align="right"/>
                        </View.Footer>
                    </View.Form>
                )}
            </Form>
        );
    }
}

export default Webiny.createComponent(Form, {
    modules: [
        'Growl', 'Dynamic', 'Grid', 'Input', 'Email', 'Button', 'Select', 'Form', 'View', 'Link', 'Copy', 'Tabs', 'Search', 'DateTime', 'Date', 'Time',
        'DateRange', 'IconPicker', 'Switch', 'Password', 'Tags', 'Textarea', 'CheckboxGroup', 'Section', 'Checkbox', 'RadioGroup', 'Avatar',
        'File', 'Image', 'Gallery', 'Draft', 'HtmlEditor', 'ButtonGroup', 'MarkdownEditor'
    ]
});
