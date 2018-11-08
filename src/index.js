import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';

import { IntlProvider } from 'react-intl';

import * as i18nService from "./i18n/i18n.service";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { ApplicationProvider } from './application/application.provider';

import Application from './application/application';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <IntlProvider locale={i18nService.locale} messages={i18nService.messages} key={i18nService.locale}>
        <MuiThemeProvider>
            <HashRouter>
                <ApplicationProvider>
                    <Application />
                </ApplicationProvider>
            </HashRouter>
        </MuiThemeProvider>
    </IntlProvider>
, document.getElementById('root'));
registerServiceWorker();
