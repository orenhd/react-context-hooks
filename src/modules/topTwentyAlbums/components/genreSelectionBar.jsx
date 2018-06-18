import React from "react";

import PropTypes from "prop-types";

import { $t } from '../../../i18n/i18n.service'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as dataTypes from '../topTwentyAlbums.dataTypes';

const GenreSelectionBar = (props) =>
<SelectField className="margined-content"
    floatingLabelText={$t.formatMessage({id: 'topTwentyAlbums.genre'})}
    value={props.currentGenre ? props.currentGenre.id : null}
    onChange={(e, index, menuItemValue) => { props.genreSelectedHandler(menuItemValue) }}
>
    {props.genres.map(genre => <MenuItem value={genre.id} primaryText={genre.title} key={genre.id} />)}
</SelectField>

GenreSelectionBar.propTypes = {
    genres: PropTypes.arrayOf(dataTypes.ITunesGenre).isRequired,
    currentGenre: dataTypes.ITunesGenre,
    genreSelectedHandler: PropTypes.func
}

export default GenreSelectionBar;