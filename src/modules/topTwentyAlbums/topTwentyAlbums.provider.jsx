import React, { useState } from 'react';

import PropTypes from "prop-types";

import * as dataTypes from './topTwentyAlbums.dataTypes';
import * as viewTypes from './topTwentyAlbums.viewTypes';

import * as ITunesService from './services/iTunes.service';

import * as utils from './topTwentyAlbums.utils';
import * as sharedUtils from '../../shared/utils';

export const TopTwentyAlbumsContext = React.createContext();

export const TopTwentyAlbumsProvider = (props) => {

    const [state, setState] = useState({
        genresMap: {},
        albumEntries: [],
        currentGenreId: null,
    });

    /* Action Methods */

    const setGenres = (genresMap) => {
        setState({ genresMap });
    }

    const setAlbumEntries = (albumEntries) => {
        setState({ albumEntries });
    }

    const setCurrentGenreId = (currentGenreId) => {
        setState({ currentGenreId });
    }

    const loadGenres = () => {
        if (!state.currentGenreId)
            ITunesService.getGenres().then((genres) => {
                const genresMap = sharedUtils.getMapFromArrayByPropertyKey(genres, 'id');
                setGenres(genresMap);
                if (genres && genres[0] && !state.currentGenreId) {
                    //loading genre ids is always followed by loading the selected genre albums list
                    loadAlbumEntriesByGenreId(genres[0].id);
                }
            })
    }

    window.loadGenres = loadGenres;

    const loadAlbumEntriesByGenreId = (genreId) => {
        setCurrentGenreId(genreId);
        ITunesService.getTopTwentyAlbumsByGenreId(genreId).then((albumEntries) => {
            setAlbumEntries(albumEntries);
        });
    }

    /* Selector Methods */

    const getSortedGenres = () => {
        const { genresMap } = state;
        if (!genresMap) return [];
    
        return sharedUtils.getSortedArrayFromMap(genresMap, 'title');
    }
    
    const getCurrentGenre = () => {
        const { genresMap, currentGenreId } = state;
        if (!genresMap || !currentGenreId) return null;

        return genresMap[currentGenreId];
    }

    const getAlbumEntriesList = () => {
        return utils.mapToListAlbumEntries(state.albumEntries);
    }

    const providerValue = { state, 
        /* Actions */
        setCurrentGenreId: setCurrentGenreId,
        loadGenres: loadGenres,
        loadAlbumEntriesByGenreId: loadAlbumEntriesByGenreId,
        /* Selectors */
        sortedGenres: getSortedGenres(),
        currentGenre: getCurrentGenre(),
        albumEntriesList: getAlbumEntriesList(), 
    }

    return <TopTwentyAlbumsContext.Provider value={providerValue}>
        {props.children}
    </TopTwentyAlbumsContext.Provider>
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