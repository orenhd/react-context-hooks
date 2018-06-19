import React, { Component } from 'react';

import PropTypes from "prop-types";

import * as dataTypes from './topTwentyAlbums.dataTypes';
import * as viewTypes from './topTwentyAlbums.viewTypes';

import * as ITunesService from './services/iTunes.service';

import * as utils from './topTwentyAlbums.utils';

const TopTwentyAlbumsContext = React.createContext(); // the context itself will remain 'private'

export default class TopTwentyAlbumsProvider extends Component {

    state = {
        genres: [],
        albumEntries: [],
        currentGenreId: null,
    }

    /* Action Methods */

    setGenres = (genres) => {
        this.setState({ genres });
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
                this.setGenres(genres);
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

    getCurrentGenre = () => {
        const { genres, currentGenreId } = this.state;
        if (!currentGenreId || !genres || !genres.length) return;

        const matchingGenres = genres.filter((genre) => genre.id === currentGenreId);
        return matchingGenres[0];
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
    genres: PropTypes.arrayOf(dataTypes.ITunesGenre).isRequired,
    albumEntries: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentGenreId: PropTypes.number,
    /* Actions */
    setCurrentGenreId: PropTypes.func.isRequired,
    loadGenres: PropTypes.func.isRequired,
    loadAlbumEntriesByGenreId: PropTypes.func.isRequired,
    /* Selectors */
    currentGenre: dataTypes.ITunesGenre,
    albumEntriesList: PropTypes.arrayOf(viewTypes.AlbumEntryListItem), 
})

/* this is the HOC that will allow us to 'connect' to the provider */

export const withTopTwentyAlbums = (WrappedComponent) => {
    return (props) => {
        return <TopTwentyAlbumsContext.Consumer>
            {(topTwentyAlbums) =>
                <WrappedComponent topTwentyAlbums={topTwentyAlbums} {...props} />
            }
        </TopTwentyAlbumsContext.Consumer>
    }
};