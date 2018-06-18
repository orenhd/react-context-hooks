import React, { PureComponent } from "react";

import PropTypes from "prop-types";

import { $t } from '../../../i18n/i18n.service'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import styles from './clickingPanel.css';

import * as dataTypes from '../clickingExample.dataTypes';

import { ClickCountTypesEnum } from '../../../shared/enums';

import { getDocumentClickHandler } from '../../../shared/addons/clickOutside.addon';

class ClickingPanel extends PureComponent {

    /* Lifecycle Methods */

    componentDidMount() {
        this.boundDocumentClickHandler = getDocumentClickHandler(this, this._homeButtonWrapperRef, this.props.homeButtonClickedOutsideHandler);
        document.addEventListener('click', this.boundDocumentClickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.boundDocumentClickHandler);
    }

    render() {
        return <div className="clicking-panel">
            <div className={`${styles.homeButtonWrapper} margined-content`} ref={(homeButtonWrapper) => {this._homeButtonWrapperRef = homeButtonWrapper}}>
                <FloatingActionButton mini={true} onClick={this.props.homeButtonClickedHandler}>
                    <FontIcon className="material-icons">home</FontIcon>
                </FloatingActionButton>
            </div>
            {this.props.clickingData[ClickCountTypesEnum.homeButtonClick] && <p className={styles.clickingDataText}>
                {$t.formatMessage({id: 'clickingExample.homeButtonClicked'}, 
                    {count: this.props.clickingData[ClickCountTypesEnum.homeButtonClick]})}
            </p>}
            {this.props.clickingData[ClickCountTypesEnum.homeButtonClickOutside] && <p className={styles.clickingDataText}>
                {$t.formatMessage({id: 'clickingExample.homeButtonClickedOutside'}, 
                    {count: this.props.clickingData[ClickCountTypesEnum.homeButtonClickOutside]})}
            </p>}
        </div>
    }
}

ClickingPanel.propTypes = {
    clickingData: dataTypes.ClickingData,
    homeButtonClickedHandler: PropTypes.func.isRequired,
    homeButtonClickedOutsideHandler: PropTypes.func.isRequired
}

export default ClickingPanel;

