import React, { PureComponent } from 'react';

import { withTopTwentyAlbums, TopTwentyAlbumsModuleType } from './topTwentyAlbums.provider';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

class TopTwentyAlbums extends PureComponent {

    /* Lifecycle Methods */
    componentDidMount = () => {
        this.props.topTwentyAlbums.loadGenres();
    }

    /* Class Methods */

    render() {
        const { genres, loadAlbumEntriesByGenreId, currentGenre, albumEntriesList} = this.props.topTwentyAlbums;

        return <div className="top-twenty-albums">
            <GenreSelectionBar 
                genres={genres} 
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

export default withTopTwentyAlbums(TopTwentyAlbums);