import React from 'react';

import { AppModulesEnum } from '../../shared/enums';

import { useAppModules } from '../../application/application.provider';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

const TopTwentyAlbums = (props) => {

    const [topTwentyAlbums] = useAppModules([AppModulesEnum.topTwentyAlbums]);

    const { loadAlbumEntriesByGenreId, currentGenre, sortedGenres, albumEntriesList} = topTwentyAlbums;

    return <div className="top-twenty-albums">
        <GenreSelectionBar 
            genres={sortedGenres} 
            currentGenre={currentGenre}
            genreSelectedHandler={loadAlbumEntriesByGenreId}
        />
        <AlbumsList
            albumEntriesList={albumEntriesList}
        />
    </div>
}

export default TopTwentyAlbums;