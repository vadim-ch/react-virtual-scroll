import * as React from 'react';
import { shallow, mount, render } from 'enzyme';

import { VirtualScroll } from '../index';

const testItem = (<div>test</div>);
const list = [testItem, testItem, testItem];

describe('<VirtualScroll> tests', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<VirtualScroll list={list}/>);
  });

  it('should exist', () => {
    expect(VirtualScroll).toBeDefined();
  });

  // it('should render without throwing an error', function() {
  //   expect(wrapper.contains(<div className="foo">Bar</div>)).toBe(true);
  // });

  // it('should be selectable by class "foo"', function() {
  //   expect(shallow(<Foo />).is('.foo')).toBe(true);
  // });
  //
  // it('should mount in a full DOM', function() {
  //   expect(mount(<Foo />).find('.foo').length).toBe(1);
  // });
  //
  // it('should render to static HTML', function() {
  //   expect(render(<Foo />).text()).toEqual('Bar');
  // });
});
