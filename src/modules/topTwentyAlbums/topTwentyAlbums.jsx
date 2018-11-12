import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

import { AppModulesEnum } from '../../shared/enums';

import { useAppModules } from '../../application/application.provider';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

const TopTwentyAlbums = (props) => {

    const [topTwentyAlbums] = useAppModules([AppModulesEnum.topTwentyAlbums]);

    const { loadGenres, loadAlbumEntriesByGenreId, currentGenre, sortedGenres, albumEntriesList } = topTwentyAlbums;

    useEffect(() => {
        loadGenres();
    },  []); // init once

    useEffect(() => {
        const genreId = parseInt(props.match.params.genreId, 10);
        loadAlbumEntriesByGenreId(genreId);
    },  [ props.match.params.genreId ]); // on route param change

    const navigateToSelectedGenreId = (genreId) => {
        props.history.push(`/top-twenty/${genreId}`);
    }

    return <div className="top-twenty-albums">
        <GenreSelectionBar 
            genres={sortedGenres} 
            currentGenre={currentGenre}
            genreSelectedHandler={navigateToSelectedGenreId}
        />
        <AlbumsList
            albumEntriesList={albumEntriesList}
        />
    </div>
}

export default withRouter(TopTwentyAlbums);