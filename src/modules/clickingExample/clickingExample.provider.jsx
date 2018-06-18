import React, { Component } from 'react';

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

/* this is the HOC that will allow us to 'connect' to the provider */

export const withClickingExample = (WrappedComponent) => {
    return (props) => {
        return <ClickingExampleContext.Consumer>
            {(clickingExample) =>
                <WrappedComponent clickingExample={clickingExample} {...props} />
            }
        </ClickingExampleContext.Consumer>
    }
};