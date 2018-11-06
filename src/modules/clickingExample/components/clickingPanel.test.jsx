import React from 'react';
import { shallow } from 'enzyme';

import ClickingPanel from './clickingPanel';
import { ClickCountTypesEnum } from '../../../shared/enums';

const shallowRenderByProps = (clickingData) => {
  return shallow(<ClickingPanel
    clickingData={clickingData}
    homeButtonClickedHandler={jest.fn()}
    homeButtonClickedOutsideHandler={jest.fn()}
  />);
}

describe('clickingPanel', () => {
  it('should render correctly', () => {

    const clickingData = {
      [ClickCountTypesEnum.homeButtonClick]: 3,
      [ClickCountTypesEnum.homeButtonClickOutside]: 4,
    }

    const component = shallowRenderByProps(clickingData);

    expect(component).toMatchSnapshot();
  });

  it('single click -should render correctly', () => {

    const clickingData = {
      [ClickCountTypesEnum.homeButtonClick]: 1,
    }

    const component = shallowRenderByProps(clickingData);

    expect(component).toMatchSnapshot();
  });

  it('single click outside - should render correctly', () => {

    const clickingData = {
      [ClickCountTypesEnum.homeButtonClickOutside]: 1,
    }

    const component = shallowRenderByProps(clickingData);

    expect(component).toMatchSnapshot();
  });
});
