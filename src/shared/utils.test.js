
import { getMapFromArrayByPropertyKey, getSortedArrayFromMap } from "./utils";

/* Import Mocks */
import iTunesGenreIdsCacheMock from '../modules/topTwentyAlbums/services/__mocks__/iTunesGenreIdsCache.mock.json';

describe('shared utils logic', () => {

  it('map and sort utils', () => {

    /* Map */

    const genresMap = getMapFromArrayByPropertyKey(iTunesGenreIdsCacheMock, 'id');
    
    const genresMapKeys = Object.keys(genresMap);
    expect(genresMapKeys.length).toBe(iTunesGenreIdsCacheMock.length);

    const firstIdKey = genresMapKeys[0];
    expect(genresMap[firstIdKey].id === firstIdKey).toBeFalsy();
    expect(genresMap[firstIdKey].id == firstIdKey).toBeTruthy();
    

    /* Sort */

    const sortedGenres = getSortedArrayFromMap(genresMap, 'title');

    expect(sortedGenres.length).toBe(genresMapKeys.length);
    expect(sortedGenres[0].title).toBe('Alternative');
  });


});