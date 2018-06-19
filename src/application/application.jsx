import React, { Component } from 'react';

import { withRouter } from 'react-router';

import { NavLink, Route, Redirect } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { $t } from '../i18n/i18n.service';

import { withClickingExample, ClickingExampleModuleType } from '../modules/clickingExample/clickingExample.provider';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import styles from './application.css';

/* module components */
import ClickingExample from "../modules/clickingExample/clickingExample";
import TopTwentyAlbums from "../modules/topTwentyAlbums/topTwentyAlbums";

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    /* Class Methods */

    handleToggle = () => this.setState({ open: !this.state.open });
    handleDrawerRequestChange = (open) => this.setState({ open })
    handleClose = () => this.setState({ open: false });

    render() {
        const { userName } = this.props.clickingExample;

        return <div className="application">
            <AppBar
                title={userName ? $t.formatMessage({ id: 'general.greeting' }, { userName }) : ''}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonClick={this.handleToggle}
            />
            <Drawer
                className={styles.appDrawer}
                docked={false}
                open={this.state.open}
                onRequestChange={this.handleDrawerRequestChange}
            >
                <MenuItem className={styles.menuItemTitle}>
                    <FormattedMessage id="general.navigation" />
                </MenuItem>
                <NavLink activeClassName={styles.navLinkActive} to="/clicking-example">
                    <MenuItem
                        leftIcon={<FontIcon className="material-icons">mouse</FontIcon>}
                        onClick={this.handleClose}
                    >
                        <FormattedMessage id="clickingExample.clickingExample" />
                    </MenuItem>
                </NavLink>
                <NavLink activeClassName={styles.navLinkActive} to="/top-twenty">
                    <MenuItem
                        leftIcon={<FontIcon className="material-icons">album</FontIcon>}
                        onClick={this.handleClose}
                    >
                        <FormattedMessage id="topTwentyAlbums.topTwentyAlbums" />
                    </MenuItem>
                </NavLink>
            </Drawer>
            <Route path="/clicking-example" component={ClickingExample} />
            <Route path="/top-twenty" component={TopTwentyAlbums} />
            <Route exact path="/" render={() => (
                <Redirect to="/top-twenty" />
            )} />
        </div>;
    }
}

Application.propTypes = {
    clickingExample: ClickingExampleModuleType
}

export default withRouter(withClickingExample(Application));
