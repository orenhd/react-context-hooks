import React from 'react';
import { shallow } from 'enzyme';

import ClickingPanel from './clickingPanel';

describe('clickingPanel', () => {
  it('should render correctly', () => {
    const component = shallow(<ClickingPanel
      clickingData={{}}
      homeButtonClickedHandler={jest.fn()}
      homeButtonClickedOutsideHandler={jest.fn()}
    />);

    expect(component).toMatchSnapshot();
  });
});
