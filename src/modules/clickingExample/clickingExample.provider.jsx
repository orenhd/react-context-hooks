import React, { Component } from 'react';

import PropTypes from "prop-types";

import * as dataTypes from './clickingExample.dataTypes';

const ClickingExampleContext = React.createContext(); // the context itself will remain 'private'

export default class ClickingExampleProvider extends Component {

    state = {
        userName: 'World',
        clickingData: {},
    }

    /* Action Methods */

    setUserName = (userName) => {
        this.setState({ userName })
    }

    updateClickingData = (clickCountType) => {
        const { clickingData } = this.state;
        const updateClickingData = { ...clickingData };

        const currentTypeCount = updateClickingData[clickCountType] || 0;

        updateClickingData[clickCountType] = currentTypeCount + 1;

        this.setState({ clickingData: updateClickingData });
    }

    /* Selector Methods */

    render() {
        const providerValue = { ...this.state, 
            /* Actions */
            setUserName: this.setUserName,
            updateClickingData: this.updateClickingData,
            /* Selectors */
        }

        return <ClickingExampleContext.Provider value={providerValue}>
            {this.props.children}
        </ClickingExampleContext.Provider>
    }
}

export const ClickingExampleModuleType = PropTypes.shape({
    /* State */
    userName: PropTypes.string,
    clickingData: dataTypes.ClickingData,
    /* Actions */
    setUserName: PropTypes.func.isRequired,
    updateClickingData: PropTypes.func.isRequired,
    /* Selectors */
})

/* Connection Method I - map the module through ApplicationProvider connectAppModules function */

// expose the Consumer, to be used by connectAppModules function
export const ClickingExampleConsumer = ClickingExampleContext.Consumer;

/* Connection Method II - directly through an HOC, to a default 'clickingExample' prop */

export const withClickingExample = (WrappedComponent) => {
    return (props) => {
        return <ClickingExampleContext.Consumer>
            {(clickingExample) =>
                <WrappedComponent clickingExample={clickingExample} {...props} />
            }
        </ClickingExampleContext.Consumer>
    }
};