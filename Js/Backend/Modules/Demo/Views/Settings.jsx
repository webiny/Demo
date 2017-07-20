import React from 'react';
import Webiny from 'Webiny';

class UiSettings extends Webiny.Ui.Component {

}

UiSettings.defaultProps = {
    renderer() {
        const {Settings, View, Grid, Input, Button} = this.props;
        return (
            <Settings api="/entities/demo/setting">
                {(model, container) => (
                    <View.Form>
                        <View.Header
                            title="Content Management Settings"
                            description="Set your CMS preferences here"/>
                        <View.Body>
                            <Grid.Row>
                                <Grid.Col all={12}>
                                    <Input label="Per page" name="perPage" validate="required,number"/>
                                </Grid.Col>
                            </Grid.Row>
                        </View.Body>
                        <View.Footer align="right">
                            <Button type="primary" onClick={container.submit} label="Save settings"/>
                        </View.Footer>
                    </View.Form>
                )}
            </Settings>
        );
    }
};

export default Webiny.createComponent(UiSettings, {modules: ['Settings', 'View', 'Grid', 'Input', 'Button']});