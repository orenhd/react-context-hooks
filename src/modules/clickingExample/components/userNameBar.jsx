import React from "react";

import PropTypes from "prop-types";

import { $t } from '../../../i18n/i18n.service'

import TextField from 'material-ui/TextField';

const UserNameBar = (props) =>
<TextField
    defaultValue={props.userName ? props.userName : ''}
    floatingLabelText={$t.formatMessage({id: 'clickingExample.userName'})}
    onChange={(e, newValue) => {props.userNameChangedHandler(newValue)}}
/>

UserNameBar.propTypes = {
    userName: PropTypes.string,
    userNameChangedHandler: PropTypes.func.isRequired
}

export default UserNameBar;