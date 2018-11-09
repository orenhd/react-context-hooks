import React, { useState } from 'react';

import { withRouter } from 'react-router';

import { NavLink, Route, Redirect } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { $t } from '../i18n/i18n.service';

import { AppModulesEnum } from '../shared/enums';

import { useAppModules } from './application.provider';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

import styles from './application.css';

/* module components */
import ClickingExample from "../modules/clickingExample/clickingExample";
import TopTwentyAlbums from "../modules/topTwentyAlbums/topTwentyAlbums";

const Application = () => {
    
    const [state, setState] = useState({ open: false });

    const [clickEx, topTwenty] = useAppModules([AppModulesEnum.clickingExample, AppModulesEnum.topTwentyAlbums]);

    /* Class Methods */

    const handleToggle = () => setState(prevState => { return { ...prevState, open: !state.open } });
    const handleDrawerRequestChange = (open) => setState(prevState => { return { ...prevState, open } });
    const handleClose = () => setState(prevState => { return { ...prevState, open: false } });

    const { userName } = clickEx;
    const { currentGenre } = topTwenty;

    return <div className="application">
        <AppBar
            title={userName ? $t.formatMessage({ id: 'general.greeting' }, { userName }) : ''}
            iconElementRight={currentGenre ? <Chip>{currentGenre.title}</Chip> : null}
            onLeftIconButtonClick={handleToggle}
        />
        <Drawer
            className={styles.appDrawer}
            docked={false}
            open={state.open}
            onRequestChange={handleDrawerRequestChange}
        >
            <MenuItem className={styles.menuItemTitle}>
                <FormattedMessage id="general.navigation" />
            </MenuItem>
            <NavLink activeClassName={styles.navLinkActive} to="/clicking-example">
                <MenuItem
                    leftIcon={<FontIcon className="material-icons">mouse</FontIcon>}
                    onClick={handleClose}
                >
                    <FormattedMessage id="clickingExample.clickingExample" />
                </MenuItem>
            </NavLink>
            <NavLink activeClassName={styles.navLinkActive} to="/top-twenty">
                <MenuItem
                    leftIcon={<FontIcon className="material-icons">album</FontIcon>}
                    onClick={handleClose}
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

export default withRouter(Application);
