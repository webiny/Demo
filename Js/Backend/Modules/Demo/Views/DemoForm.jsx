import React from 'react';
/* eslint-disable */
import Webiny from 'webiny';

/**
 * @i18n.namespace Demo.Backend.Demo.Form
 */
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
            onProgress({event}) {
                const cmp = <div>{this.i18n('Uploading form data... {progress}%', {progress: event.progress})}</div>;
                Webiny.Growl(<Growl.Warning id={this.growlId} title={this.i18n('Custom progress')} sticky={true}>{cmp}</Growl.Warning>);
            }
        };

        const userRoleSelect = {
            label: this.i18n('User role'),
            name: 'userRoie',placeholder: this.i18n('Select user role'),
            allowClear: true,
            api: '/entities/webiny/user-roles',
            fields: 'slug,name,id,createdOn',
            perPage: 10,
            optionRenderer: ({option}) => {
                return (
                    <div>
                        <strong>{option.data.name}</strong><br/>
                        <span>Tag: {option.data.slug}</span>
                    </div>
                );
            },
            selectedRenderer: ({option}) => {
                return option.data.name;
            },
            onChange: ({value, component}) => {
                console.log(value, component.getCurrentData());
            }
        };

        const createdBySelect = {
            label: this.i18n('Created by'),
            name: 'createdBy',
            placeholder: this.i18n('Select user'),
            allowClear: true,
            api: '/entities/webiny/users',
            fields: 'id,email',
            valueAttr: 'id',
            textAttr: 'email'
        };

        const recordUsers = {
            label: this.i18n('Record users'),
            name: 'users',
            api: '/entities/webiny/users',
            fields: 'id,email',
            textAttr: 'email',
            valueKey: 'user.id', // Used to map API options to form model
            useDataAsValue: true,
            formatOptionValue: ({value}) => {
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
                                    <Input placeholder={this.i18n('Key')} name="key" validate="required"/>
                                </Grid.Col>
                                <Grid.Col all={3}>
                                    <Input placeholder={this.i18n('Value')} name="value" validate="required"/>
                                </Grid.Col>
                                <Grid.Col all={3}>
                                    <Select {...createdBySelect} label={null}/>
                                </Grid.Col>
                                <Grid.Col all={3}>
                                    <ButtonGroup>
                                        <Button type="primary" label={this.i18n('Add')} onClick={actions.add(data)}/>
                                        <Button type="secondary" label={this.i18n('x')} onClick={actions.remove(data)}/>
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
                                <h5>{this.i18n('You have not created any settings yet. Click "Add settings" to start creating your settings!')}</h5>
                                <Button type="primary" label={this.i18n('Add settings')} onClick={actions.add()}/>
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
                        <View.Header title={this.i18n('Demo Form')}
                                     description={this.i18n('Demo form to demonstrate most of the input components Webiny offers')}>
                            <Link type="default" align="right" route="Demo.List">{this.i18n('Back to list')}</Link>
                            <Copy.Button
                                onSuccessmessage={this.i18n('Stolen!')}
                                type="secondary"
                                icon="icon-pencil"
                                value="You just stole a record!"
                                label={this.i18n('Steal it...')}
                                align="right"/>
                        </View.Header>
                        <View.Body noPadding>
                            <Tabs size="large">
                                <Tabs.Tab label={this.i18n('Input components')} icon="icon-gauge">
                                    <Grid.Row>
                                        <Grid.Col all={3}>
                                            <Input
                                                label={this.i18n('Name')}
                                                name="name"
                                                validate="required,minLength:3"/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <Email
                                                label={this.i18n('Email')}
                                                name="email"
                                                validate="required"
                                                tooltip="Your email address"/>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <Search
                                                name="avatar"
                                                textAttr="name"
                                                label={this.i18n('Find file')}
                                                api="/entities/webiny/files"
                                                fields="name,id,createdOn,ref"
                                                searchFields="name"
                                                allowFreeInput={false}
                                                validate="required"
                                                useDataAsValue={false}
                                                filterBy="userRole"
                                                onChange={({value, component}) => console.log(value, component)}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={3}>
                                            <DateTime
                                                label={this.i18n('Date & Time')}
                                                name="datetime"
                                                placeholder={this.i18n('Select date and time')}/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <Date
                                                label={this.i18n('Date')}
                                                name="date"
                                                placeholder={this.i18n('Select a date')}
                                                validate="required"/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <Time
                                                label={this.i18n('Time')}
                                                name="time"
                                                placeholder={this.i18n('Select time')}/>
                                        </Grid.Col>
                                        <Grid.Col all={3}>
                                            <DateRange
                                                label={this.i18n('Date range')}
                                                name="daterange"
                                                placeholder={this.i18n('Select a date range')}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={4}>
                                            <Select {...userRoleSelect} />
                                        </Grid.Col>
                                        <Grid.Col all={4}>
                                            <Select
                                                name="staticSelect"
                                                label={this.i18n('Static select')}
                                                placeholder={this.i18n('Select an option')}>
                                                <option value="yes">{this.i18n('Yes')}</option>
                                                <option value="no">
                                                    <webiny-no>{this.i18n('No')}</webiny-no>
                                                </option>
                                                <option value="maybe"><strong>{this.i18n('Maybe')}</strong></option>
                                            </Select>
                                        </Grid.Col>
                                        <Grid.Col all={4}>
                                            <IconPicker name="icon" label={this.i18n('Your icon')}
                                                        allowClear={true} placeholder={this.i18n('Select your icon')}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={6}>
                                            <Switch label={this.i18n('Enabled')} name="enabled"/>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <Password label={this.i18n('Password')} name="password"/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={12}>
                                            <Copy.Input label={this.i18n('Cron setup')}
                                                        value="* * * * * wget http://selecto.app:8001/api/services/cron-manager/runner/run >/dev/null 2>&1"/>
                                        </Grid.Col>
                                        <Grid.Col all={12}>
                                            <Tags name="tags" placeholder={this.i18n('Add tag')} label={this.i18n('Tags')}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={12}>
                                            <Textarea
                                                label={this.i18n('Description')}
                                                name="description"
                                                tooltip="Put any tooltip text here..."/>
                                        </Grid.Col>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Col all={12}>
                                            <h4>{this.i18n('Settings')}</h4>
                                            {settings}
                                        </Grid.Col>
                                    </Grid.Row>
                                </Tabs.Tab>
                                <Tabs.Tab label={this.i18n('Checkboxes')} icon="icon-columns">
                                    <Grid.Row>
                                        {/* CHECKBOXES */}
                                        <Grid.Col all={6}>
                                            <Section title={this.i18n('Static checkboxes (hard-coded options)')}/>
                                            <CheckboxGroup name="roles" validate="minLength:2">
                                                <option value="Admin">{this.i18n('Admin management')}</option>
                                                <option value="Coupon">{this.i18n('Coupon management')}</option>
                                                <option value="Crm">{this.i18n('CRM')}</option>
                                                <option value="Dashboard">{this.i18n('Dashboard')}</option>
                                                <option value="anually"><strong>{this.i18n('Annually')}</strong></option>
                                                <option value="monthly">
                                                    <div>{this.i18n('Monthly (One season minimum)')}</div>
                                                </option>
                                                <validator name="minLength">{this.i18n('Please select at least 2 options')}</validator>
                                            </CheckboxGroup>

                                            <div className="clearfix"/>
                                            <Section title={this.i18n('Single checkbox')}/>
                                            <Checkbox label={this.i18n('Single checkbox')} name="singleCheckbox" tooltip="Set immediately"/>

                                            <div className="clearfix"/>
                                            <Section title={this.i18n('Custom checkbox markup using "checkboxRenderer" prop')}/>
                                            <CheckboxGroup name="roles" checkboxRenderer={function renderCheckbox() {
                                                return (
                                                    <li className="list-item col-xs-offset-1">
                                                        <div className="form-group">
                                                            <div className="checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    id={this.id}
                                                                    disabled={this.isDisabled()}
                                                                    checked={this.isChecked()} onChange={this.onChange}/>
                                                                <label htmlFor={this.id}><span className="form-icon"/>{this.props.label}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            }}>
                                                <option value="Admin">{this.i18n('Admin management')}</option>
                                                <option value="Coupon">{this.i18n('Coupon management')}</option>
                                                <option value="Crm">{this.i18n('CRM')}</option>
                                            </CheckboxGroup>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <Section title={this.i18n('Dynamic checkboxes for manual aggregation')}/>
                                            <CheckboxGroup {...recordUsers}/>
                                        </Grid.Col>
                                    </Grid.Row>
                                </Tabs.Tab>
                                <Tabs.Tab label={this.i18n('Radio buttons')} icon="icon-columns">
                                    <Grid.Row>
                                        {/* RADIO */}
                                        <Grid.Col all={6}>
                                            <RadioGroup label={this.i18n('Roles (static)')} name="access">
                                                <option value="Admin">{this.i18n('Admin')}</option>
                                                <option value="Billing">{this.i18n('Billing')}</option>
                                                <option value="Crm">{this.i18n('CRM')}</option>
                                                <option value="Dashboard">{this.i18n('Dashboard')}</option>
                                            </RadioGroup>
                                        </Grid.Col>
                                        <Grid.Col all={6}>
                                            <RadioGroup
                                                label={this.i18n('User (API)')}
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
                                <Tabs.Tab label={this.i18n('Upload components')} icon="icon-picture-1">
                                    <Grid.Row>
                                        <Grid.Col all={6}>
                                            <Avatar name="avatar"/>
                                            <br/>
                                            <File
                                                name="avatar"
                                                label={this.i18n('Avatar image')}
                                                placeholder={this.i18n('Select a file')}
                                                description={this.i18n('Any file up to 2.5MB will do')}
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
                                <Tabs.Tab label={this.i18n('WYSIWYG')} icon="fa-font">
                                    <HtmlEditor name="html"/>
                                    <MarkdownEditor name="markdown"/>
                                </Tabs.Tab>
                                <Tabs.Tab label={this.i18n('Draft Editor')} icon="fa-font">
                                    <Button
                                        label={this.state.preview ? 'Edit' : 'Preview'}
                                        onClick={() => this.setState({preview: !this.state.preview})}/>
                                    <hr/>
                                    <Draft.Editor
                                        name="draft"
                                        placeholder={this.i18n('Tell a story...')}
                                        plugins={this.plugins}
                                        preview={this.state.preview}/>
                                </Tabs.Tab>
                            </Tabs>
                        </View.Body>
                        <View.Footer>
                            <Button type="default" onClick={form.cancel} label={this.i18n('Cancel')}/>
                            <Button type="primary" onClick={form.submit} label={this.i18n('Submit')} align="right"/>
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
