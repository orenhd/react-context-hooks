import iTunesGenreIdsCacheMock from './__mocks__/iTunesGenreIdsCache.mock.json';

const ITUNES_GET_TOP_ALBUMS = 'https://itunes.apple.com/us/rss/topalbums/limit=20/genre=14/json';

// iTunes rss api doesn't really have a genre ids endpoint 
// - the following cache object is used as a mockup
const iTunesGenreIdsCache = iTunesGenreIdsCacheMock;

const iTunesTopTwentyAlbumsByGenreIdCache = {};

export function getGenres() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(iTunesGenreIdsCache);
        }, Math.floor(Math.random() * 100));
    });
}

export function getTopTwentyAlbumsByGenreId(genreId) {
    return new Promise((resolve, reject) => {
        if (isNaN(genreId) || genreId < 0) { reject('getTopTwentyAlbumsByGenreId error'); }

        // first, try from cache
        else if (iTunesTopTwentyAlbumsByGenreIdCache[genreId]) { resolve(iTunesTopTwentyAlbumsByGenreIdCache[genreId]); }

        else {
            let iTunesGetTopAlbumsApi = ITUNES_GET_TOP_ALBUMS.replace('genre=14', `genre=${genreId}`);
            fetch(iTunesGetTopAlbumsApi, {
                method: 'get'
            }).then((response) => {
                let contentType = response.headers.get("content-type");
                if(contentType && contentType.includes('text/javascript')) {
                    response.json().then((json) => {
                        if (json.feed && json.feed.entry) {
                            // also store in private service cache
                            iTunesTopTwentyAlbumsByGenreIdCache[genreId] = json.feed.entry;
                            resolve(json.feed.entry);
                        } else {
                            reject('getTopTwentyAlbumsByGenreId error');
                        }
                    }).catch((err) => {
                        // error
                        reject(err);
                    });
                }
            }).catch((err) => {
                // error
                reject(err);
            });
        }
    });
}