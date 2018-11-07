import React from 'react';
import { shallow } from 'enzyme';

import AlbumsList from './albumsList';

/* Import Mocks */
import albumEntriesListMock from '../__mocks__/albumEntriesList.mock.json';

describe('albumsList', () => {
  it('should render correctly', () => {

    const component = shallow(<AlbumsList
      albumEntriesList={albumEntriesListMock}
    />);

    expect(component).toMatchSnapshot();
  });
});
