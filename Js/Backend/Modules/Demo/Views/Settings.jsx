import Webiny from 'Webiny';
const Ui = Webiny.Ui.Components;

class UiSettings extends Webiny.Ui.Component {

}

UiSettings.defaultProps = {
    renderer() {
        return (
            <Ui.Settings api="/entities/demo/setting">
                {(model, container) => (
                    <Ui.View.Form>
                        <Ui.View.Header
                            title="Content Management Settings"
                            description="Set your CMS preferences here"/>
                        <Ui.View.Body>
                            <Ui.Grid.Row>
                                <Ui.Grid.Col all={12}>
                                    <Ui.Input label="Per page" name="perPage" validate="required,number"/>
                                </Ui.Grid.Col>
                            </Ui.Grid.Row>
                        </Ui.View.Body>
                        <Ui.View.Footer align="right">
                            <Ui.Button type="primary" onClick={container.submit} label="Save settings"/>
                        </Ui.View.Footer>
                    </Ui.View.Form>
                )}
            </Ui.Settings>
        );
    }
};

export default UiSettings;