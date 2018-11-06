import React, { Component } from 'react';

import PropTypes from "prop-types";

import * as dataTypes from './topTwentyAlbums.dataTypes';
import * as viewTypes from './topTwentyAlbums.viewTypes';

import * as ITunesService from './services/iTunes.service';

import * as utils from './topTwentyAlbums.utils';
import * as sharedUtils from '../../shared/utils';

const TopTwentyAlbumsContext = React.createContext(); // the context itself will remain 'private'

export default class TopTwentyAlbumsProvider extends Component {

    state = {
        genresMap: {},
        albumEntries: [],
        currentGenreId: null,
    }

    /* Action Methods */

    setGenres = (genresMap) => {
        this.setState({ genresMap });
    }

    setAlbumEntries = (albumEntries) => {
        this.setState({ albumEntries });
    }

    setCurrentGenreId = (currentGenreId) => {
        this.setState({ currentGenreId });
    }

    loadGenres = () => {
        if (!this.state.currentGenreId)
            ITunesService.getGenres().then((genres) => {
                const genresMap = sharedUtils.getMapFromArrayByPropertyKey(genres, 'id');
                this.setGenres(genresMap);
                if (genres && genres[0] && !this.state.currentGenreId) {
                    //loading genre ids is always followed by loading the selected genre albums list
                    this.loadAlbumEntriesByGenreId(genres[0].id);
                }
            })
    }

    loadAlbumEntriesByGenreId = (genreId) => {
        ITunesService.getTopTwentyAlbumsByGenreId(genreId).then((albumEntries) => {
            this.setCurrentGenreId(genreId);
            this.setAlbumEntries(albumEntries);
        });
    }

    /* Selector Methods */

    getSortedGenres = () => {
        const { genresMap } = this.state;
        if (!genresMap) return [];
    
        return sharedUtils.getSortedArrayFromMap(genresMap, 'title');
    }
    
    getCurrentGenre = () => {
        const { genresMap, currentGenreId } = this.state;
        if (!genresMap || !currentGenreId) return null;

        return genresMap[currentGenreId];
    }

    getAlbumEntriesList = () => {
        return utils.mapToListAlbumEntries(this.state.albumEntries);
    }

    render() {
        const providerValue = { ...this.state, 
            /* Actions */
            setCurrentGenreId: this.setCurrentGenreId,
            loadGenres: this.loadGenres,
            loadAlbumEntriesByGenreId: this.loadAlbumEntriesByGenreId,
            /* Selectors */
            sortedGenres: this.getSortedGenres(),
            currentGenre: this.getCurrentGenre(),
            albumEntriesList: this.getAlbumEntriesList(), 
        }

        return <TopTwentyAlbumsContext.Provider value={providerValue}>
            {this.props.children}
        </TopTwentyAlbumsContext.Provider>
    }
}

export const TopTwentyAlbumsModuleType = PropTypes.shape({
    /* State */
    albumEntries: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentGenreId: PropTypes.number,
    /* Actions */
    setCurrentGenreId: PropTypes.func.isRequired,
    loadGenres: PropTypes.func.isRequired,
    loadAlbumEntriesByGenreId: PropTypes.func.isRequired,
    /* Selectors */
    sortedGenres: PropTypes.arrayOf(dataTypes.ITunesGenre).isRequired,
    currentGenre: dataTypes.ITunesGenre,
    albumEntriesList: PropTypes.arrayOf(viewTypes.AlbumEntryListItem), 
})

/* Connection Method I - map the module through ApplicationProvider connectAppModules function */

// expose the Consumer, to be used by connectAppModules function
export const TopTwentyAlbumsConsumer = TopTwentyAlbumsContext.Consumer;

/* Connection Method II - directly through an HOC, to a default 'topTwentyAlbums' prop */

export const withTopTwentyAlbums = (WrappedComponent) => {
    return (props) => {
        return <TopTwentyAlbumsContext.Consumer>
            {(topTwentyAlbums) =>
                <WrappedComponent topTwentyAlbums={topTwentyAlbums} {...props} />
            }
        </TopTwentyAlbumsContext.Consumer>
    }
};