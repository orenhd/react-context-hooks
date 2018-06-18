import PropTypes from "prop-types";

export const AlbumEntryListItem = PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'title': PropTypes.string.isRequired,
    'artist': PropTypes.string.isRequired,
    'copyright': PropTypes.string.isRequired,
    'thumbnail': PropTypes.string.isRequired
})