import React, { PureComponent } from 'react';

import { AppModulesEnum } from '../../shared/enums';

import { connectAppModules } from '../../application/application.provider';
import { TopTwentyAlbumsModuleType } from './topTwentyAlbums.provider';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

class TopTwentyAlbums extends PureComponent {

    /* Lifecycle Methods */
    componentDidMount = () => {
        this.props.topTwentyAlbums.loadGenres();
    }

    /* Class Methods */

    render() {
        const { loadAlbumEntriesByGenreId, currentGenre, sortedGenres, albumEntriesList} = this.props.topTwentyAlbums;

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
}

TopTwentyAlbums.propTypes = {
    topTwentyAlbums: TopTwentyAlbumsModuleType
}

const mapAppModulesToProps = {
    topTwentyAlbums: AppModulesEnum.topTwentyAlbums,
}

// example for using connection method I - connectAppModules
export default connectAppModules(mapAppModulesToProps)(TopTwentyAlbums);