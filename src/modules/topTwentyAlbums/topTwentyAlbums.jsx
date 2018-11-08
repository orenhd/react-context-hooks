import React, { useEffect } from 'react';

import { AppModulesEnum } from '../../shared/enums';

import { useAppModules } from '../../application/application.provider';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

let genresLoaded = false;

const TopTwentyAlbums = (props) => {

    const [topTwentyAlbums] = useAppModules([AppModulesEnum.topTwentyAlbums]);

    const { loadAlbumEntriesByGenreId, currentGenre, sortedGenres, albumEntriesList} = topTwentyAlbums;

    useEffect(() => {
        if (!genresLoaded) {
            genresLoaded = true;
            topTwentyAlbums.loadGenres();
        }
        return () => {
            genresLoaded = false;
        }
    }); // conditionally fire only on first run 

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