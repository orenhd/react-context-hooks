import PropTypes from "prop-types";

export const ITunesGenre = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
})