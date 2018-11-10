import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { $t } from '../../../i18n/i18n.service'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import styles from './clickingPanel.scss';

import * as dataTypes from '../clickingExample.dataTypes';

import { ClickCountTypesEnum } from '../../../shared/enums';

import { getDocumentClickHandler } from '../../../shared/addons/clickOutside.addon';

const ClickingPanel = (props) => {

    let boundDocumentClickHandler, _homeButtonWrapperRef;
    
    useEffect(() => {
        boundDocumentClickHandler = getDocumentClickHandler(this, _homeButtonWrapperRef, props.homeButtonClickedOutsideHandler);
        document.addEventListener('click', boundDocumentClickHandler);
        return () => {
            document.removeEventListener('click', boundDocumentClickHandler);
        }
    });

    return <div className="clicking-panel">
        <div className={`${styles.homeButtonWrapper} margined-content`} ref={(homeButtonWrapper) => {_homeButtonWrapperRef = homeButtonWrapper}}>
            <FloatingActionButton mini={true} onClick={props.homeButtonClickedHandler}>
                <FontIcon className="material-icons">home</FontIcon>
            </FloatingActionButton>
        </div>
        {props.clickingData[ClickCountTypesEnum.homeButtonClick] && <p className={styles.clickingDataText}>
            {$t.formatMessage({id: 'clickingExample.homeButtonClicked'}, 
                {count: props.clickingData[ClickCountTypesEnum.homeButtonClick]})}
        </p>}
        {props.clickingData[ClickCountTypesEnum.homeButtonClickOutside] && <p className={styles.clickingDataText}>
            {$t.formatMessage({id: 'clickingExample.homeButtonClickedOutside'}, 
                {count: props.clickingData[ClickCountTypesEnum.homeButtonClickOutside]})}
        </p>}
    </div>
}

ClickingPanel.propTypes = {
    clickingData: dataTypes.ClickingData,
    homeButtonClickedHandler: PropTypes.func.isRequired,
    homeButtonClickedOutsideHandler: PropTypes.func.isRequired
}

export default ClickingPanel;

