import React, { useContext } from "react";

import { ClickingExampleContext } from './clickingExample.provider';

import { ClickCountTypesEnum } from '../../shared/enums';

import UserNameBar from './components/userNameBar';
import ClickingPanel from './components/clickingPanel';

const ClickingExample = (props) => {

    const clickingExample = useContext(ClickingExampleContext); // an example for requestingthe context directly

    const { userName, clickingData, setUserName, updateClickingData } = clickingExample;

    const homeButtonClicked = () => {
        updateClickingData(ClickCountTypesEnum.homeButtonClick);
    }

    const homeButtonClickedOutside = () => {
        updateClickingData(ClickCountTypesEnum.homeButtonClickOutside);
    }

    return <div className="clicking-example margined-content">
        <UserNameBar 
            userName={userName} 
            userNameChangedHandler={setUserName}
        />
        <ClickingPanel
            clickingData={clickingData}
            homeButtonClickedHandler={homeButtonClicked}
            homeButtonClickedOutsideHandler={homeButtonClickedOutside}
        />
    </div>
}

export default ClickingExample;