import React, { PureComponent } from "react";

import { withClickingExample, ClickingExampleModuleType } from './clickingExample.provider';

import { ClickCountTypesEnum } from '../../shared/enums';

import UserNameBar from './components/userNameBar';
import ClickingPanel from './components/clickingPanel';

class ClickingExample extends PureComponent {

    /* Class Methods */

    homeButtonClicked = () => {
        this.props.clickingExample.updateClickingData(ClickCountTypesEnum.homeButtonClick);
    }

    homeButtonClickedOutside = () => {
        this.props.clickingExample.updateClickingData(ClickCountTypesEnum.homeButtonClickOutside);
    }

    render() {
        const { userName, clickingData, setUserName } = this.props.clickingExample;

        return <div className="clicking-example margined-content">
            <UserNameBar 
                userName={userName} 
                userNameChangedHandler={setUserName}
            />
            <ClickingPanel
                clickingData={clickingData}
                homeButtonClickedHandler={this.homeButtonClicked}
                homeButtonClickedOutsideHandler={this.homeButtonClickedOutside}
            />
        </div>
    }
}

ClickingExample.propTypes = {
    clickingExample: ClickingExampleModuleType
}

export default withClickingExample(ClickingExample);