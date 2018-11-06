import { mapToListAlbumEntries } from "./topTwentyAlbums.utils";

/* Import Mocks */
import albumEntriesMock from './__mocks__/albumEntries.json';
import albumEntriesListMock from './__mocks__/albumEntriesList.json';

describe('topTwentyAlbums - utils logic', () => {
  it('mapToListAlbumEntries', () => {
    const albumEntriesList = mapToListAlbumEntries(albumEntriesMock);
    expect(albumEntriesList).toEqual(albumEntriesListMock);
  });
});
