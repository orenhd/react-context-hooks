import React from "react";

import PropTypes from "prop-types";

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import * as viewTypes from '../topTwentyAlbums.viewTypes';

const AlbumsList = (props) =>
<List>
    {props.albumEntriesList.map(albumEntry => 
        <ListItem
        key={albumEntry.id}
        leftAvatar={<Avatar src={albumEntry.thumbnail} />}
        primaryText={albumEntry.title}
        secondaryText={
            <p>
            <span>{albumEntry.artist}</span>
                <br />
            <span>{albumEntry.copyright}</span>
            </p>
        }
        secondaryTextLines={2}
        style={{pointerEvents: 'none'}}
        />
    )}
</List>

AlbumsList.propTypes = {
    albumEntriesList: PropTypes.arrayOf(viewTypes.AlbumEntryListItem).isRequired,
}

export default AlbumsList;