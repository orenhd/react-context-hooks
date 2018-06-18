import React, { Component } from 'react';

import ClickingExampleProvider from '../modules/clickingExample/clickingExample.provider';
import TopTwentyAlbumsProvider from '../modules/topTwentyAlbums/topTwentyAlbums.provider';

/* application provider doesn't maintin a context of its own - it provides the application modules contexts */

export default class ApplicationProvider extends Component {

    state = { }

    render() {
        return <ClickingExampleProvider>
            <TopTwentyAlbumsProvider>
                {this.props.children}
            </TopTwentyAlbumsProvider>
        </ClickingExampleProvider>
    }
}

/* TODO: connectApplicationModules function */