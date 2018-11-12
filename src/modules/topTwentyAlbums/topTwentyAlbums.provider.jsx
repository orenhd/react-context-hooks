import React, { useState, useMemo } from 'react';

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
        setState(prevState => { return { ...prevState, genresMap } });
    }

    const setAlbumEntries = (albumEntries) => {
        setState(prevState => { return { ...prevState, albumEntries } });
    }

    const setCurrentGenreId = (currentGenreId) => {
        setState(prevState => { return { ...prevState, currentGenreId } });
    }

    const loadGenres = () => {
        ITunesService.getGenres().then((genres) => {
            const genresMap = sharedUtils.getMapFromArrayByPropertyKey(genres, 'id');
            setGenres(genresMap);
        });
    }

    const loadAlbumEntriesByGenreId = (requestedGenreId) => {
        const genreId = requestedGenreId || ITunesService.DEFAULT_GENRE_ID;
        setCurrentGenreId(genreId);
        ITunesService.getTopTwentyAlbumsByGenreId(genreId).then((albumEntries) => {
            setAlbumEntries(albumEntries);
        });
    }

    /* Selector Methods */

    const getSortedGenres = () => {
        const { genresMap } = state;
    
        return useMemo(() => sharedUtils.getSortedArrayFromMap(genresMap, 'title'), [genresMap]);
    }
    
    const getCurrentGenre = () => {
        const { genresMap, currentGenreId } = state;

        return genresMap[currentGenreId];
    }

    const getAlbumEntriesList = () => {
        const { albumEntries } = state;

        return useMemo(() => utils.mapToListAlbumEntries(albumEntries), [albumEntries]);
    }

    const providerValue = { ...state, 
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