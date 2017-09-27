import React from 'react';
import Webiny from 'webiny';

/**
 * @i18n.namespace Demo.Backend.Demo.Settings
 */
class UiSettings extends Webiny.Ui.Component {

}

UiSettings.defaultProps = {
    renderer() {
        const {Settings, View, Grid, Input, Button} = this.props;
        return (
            <Settings api="/entities/demo/setting">
                {({form}) => (
                    <View.Form>
                        <View.Header
                            title={this.i18n('Content Management Settings')}
                            description="Set your CMS preferences here"/>
                        <View.Body>
                            <Grid.Row>
                                <Grid.Col all={12}>
                                    <Input label={this.i18n('Per page')} name="perPage" validate="required,number"/>
                                </Grid.Col>
                            </Grid.Row>
                        </View.Body>
                        <View.Footer align="right">
                            <Button type="primary" onClick={form.submit} label={this.i18n('Save settings')}/>
                        </View.Footer>
                    </View.Form>
                )}
            </Settings>
        );
    }
};

export default Webiny.createComponent(UiSettings, {modules: ['Settings', 'View', 'Grid', 'Input', 'Button']});