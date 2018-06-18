import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { withClickingExample } from './clickingExample.provider';

import * as dataTypes from './clickingExample.dataTypes';

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

/* TODO: ClickingExample.propTypes */

export default withClickingExample(ClickingExample);