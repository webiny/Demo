import React from 'react';
import _ from 'lodash';
import Webiny from 'webiny';

class CustomLayout extends Webiny.Ui.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: props.container.getSearchQuery()
        };
    }

    render() {
        const buttonProps = {
            style: {marginTop: -10},
            className: 'pull-right',
            type: 'secondary',
            label: 'Page 2',
            onClick: this.props.container.setPage.bind(null, 2)
        };

        const inputProps = _.assign({
            onEnter: e => this.props.container.setSearchQuery(e.target.value),
            placeholder: 'Search...'
        }, this.bindTo('search'));

        const {Panel, Button, Input} = this.props;

        return (
            <Panel>
                <Panel.Header title="Custom element layout">
                    <Button {...buttonProps}/>
                </Panel.Header>
                <Panel.Body>
                    <Input {...inputProps}/>
                    {this.props.table}
                    {this.props.pagination}
                </Panel.Body>
                <Panel.Footer>
                    Filters: {this.props.filters}
                </Panel.Footer>
            </Panel>
        );
    }
}

export default Webiny.createComponent(CustomLayout, {modules: ['Panel', 'Button', 'Input']});