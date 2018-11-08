import React, { useContext } from 'react';

import { AppModulesEnum } from '../shared/enums';

import { ClickingExampleContext, ClickingExampleProvider } from '../modules/clickingExample/clickingExample.provider';
import { TopTwentyAlbumsContext, TopTwentyAlbumsProvider } from '../modules/topTwentyAlbums/topTwentyAlbums.provider';

/* application provider doesn't maintin a context of its own - it provides the application modules contexts */
export const ApplicationProvider = (props) => {
    return <ClickingExampleProvider>
        <TopTwentyAlbumsProvider>
            {props.children}
        </TopTwentyAlbumsProvider>
    </ClickingExampleProvider>
}

const ContextsDictionary = {
    [AppModulesEnum.clickingExample]: ClickingExampleContext,
    [AppModulesEnum.topTwentyAlbums]: TopTwentyAlbumsContext,
}

/**
 * useAppModules
 * @param modulesMapping - an array of modules identifiers according to AppModulesEnum
 * @returns an array of contexts for use
 **/
export const useAppModules = (modulesIdentifiers) => {

    const usedContexts = [];

    /* prepare an HOC for each required module */
    modulesIdentifiers.forEach((key) => {
        const context = ContextsDictionary[key];

        if (context) {
            usedContexts.push(useContext(context));
        }
    });

    return usedContexts;
}
