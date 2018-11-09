import React, { useState } from 'react';

import PropTypes from "prop-types";

import * as dataTypes from './clickingExample.dataTypes';

export const ClickingExampleContext = React.createContext();

export const ClickingExampleProvider = (props) => {

    const [state, setState] = useState({
        userName: 'World',
        clickingData: {},
    });

    /* Action Methods */

    const setUserName = (userName) => {
        setState({ ...state, userName });
    }

    const updateClickingData = (clickCountType) => {
        const { clickingData } = state;
        const updateClickingData = { ...clickingData };

        const currentTypeCount = updateClickingData[clickCountType] || 0;

        updateClickingData[clickCountType] = currentTypeCount + 1;

        setState({ ...state, clickingData: updateClickingData });
    }

    const providerValue = { ...state, 
        /* Actions */
        setUserName,
        updateClickingData,
        /* Selectors */
    }

    return <ClickingExampleContext.Provider value={providerValue}>
        {props.children}
    </ClickingExampleContext.Provider>
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