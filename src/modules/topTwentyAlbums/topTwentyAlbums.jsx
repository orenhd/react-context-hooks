import React, { PureComponent } from 'react';

import PropTypes from "prop-types";

import { withTopTwentyAlbums } from './topTwentyAlbums.provider';

import * as dataTypes from './topTwentyAlbums.dataTypes';
import * as viewTypes from './topTwentyAlbums.viewTypes';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

class TopTwentyAlbums extends PureComponent {

    /* Lifecycle Methods */
    componentDidMount = () => {
        this.props.topTwentyAlbums.loadGenres();
    }

    /* Class Methods */

    render() {
        const { genres, loadAlbumEntriesByGenreId, getCurrentGenre, getAlbumEntriesList } = this.props.topTwentyAlbums;

        const currentGenre = getCurrentGenre(); // selector
        const albumEntriesList = getAlbumEntriesList(); // selector

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

/* TODO: TopTwentyAlbums.propTypes */

export default withTopTwentyAlbums(TopTwentyAlbums);