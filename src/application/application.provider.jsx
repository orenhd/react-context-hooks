import React, { Component } from 'react';

import { AppModulesEnum } from '../shared/enums';

import ClickingExampleProvider, { ClickingExampleConsumer } from '../modules/clickingExample/clickingExample.provider';
import TopTwentyAlbumsProvider, { TopTwentyAlbumsConsumer } from '../modules/topTwentyAlbums/topTwentyAlbums.provider';

/* application provider doesn't maintin a context of its own - it provides the application modules contexts */

export default class ApplicationProvider extends Component {

    state = {}

    render() {
        return <ClickingExampleProvider>
            <TopTwentyAlbumsProvider>
                {this.props.children}
            </TopTwentyAlbumsProvider>
        </ClickingExampleProvider>
    }
}

const ConsumersDictionary = {
    [AppModulesEnum.clickingExample]: ClickingExampleConsumer,
    [AppModulesEnum.topTwentyAlbums]: TopTwentyAlbumsConsumer,
}

/**
 * connectAppModules
 * @param modulesMapping - a map of modules identifiers according to AppModulesEnum, to prop string keys
 * @returns an HOC wrapping a component with the selected modules Consumers
 **/
export const connectAppModules = (origModulesMapping) => {

    const modulesMapping = { ...origModulesMapping }; // assign to a new object, in order to pass to returned HOC safely

    return (OrigWrappedComponent) => {

        const wrappingComponents = [];

        /* prepare an HOC for each required module */
        Object.keys(modulesMapping).forEach((propKey) => {
            const Consumer = ConsumersDictionary[modulesMapping[propKey]];

            if (Consumer) {
                wrappingComponents.push((WrappedComponent) => {
                    return (props) => {
                        return <Consumer>
                            {(contextValue) => {
                                const wrappedProps = { ...props, [propKey]: contextValue };
                                return <WrappedComponent { ...wrappedProps } />
                            }}
                        </Consumer>
                    }
                })
            }
        })

        if (!wrappingComponents.length) return OrigWrappedComponent;

        /* apply the prepared HOCs progressively */
        let wrappedComponent = wrappingComponents[0](OrigWrappedComponent);

        if (wrappingComponents.length > 1) {
            for (let i = 1; i < wrappingComponents.length; i++) {
                wrappedComponent = wrappingComponents[1](wrappedComponent);
            }
        }

        return wrappedComponent;
    }
}