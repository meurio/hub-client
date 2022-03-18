import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import * as mock from '../../../../../../../utils/mock';
import Page from './page';

describe('routes/admin/authenticated/sidebar/widgets-form-settings/export/page', () => {
  let wrapper;
  const props = {
    params: { widget_id: '1' },
    loading: false,
    success: false,
    error: undefined,
    widget: { id: 1 },
    mobilization: { name: 'Foo bar' },
    // Actions
    asyncWidgetDataExport: mock.noop,
    dataExportMount: mock.noop,
  };

  beforeEach(() => {
    wrapper = shallow(<Page {...props} />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok;
    });
  });
});
