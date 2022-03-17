import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleFontsLoader } from '../../../components/fonts';
import * as arrayUtil from '../../../utils/array';

import Mobilization from '../../../mobrender/components/mobilization.connected';

export class MobilizationsEditPage extends Component {
  render() {
    const { mobilization, blocks, widgets, history } = this.props;

    const fonts = [mobilization.header_font, mobilization.body_font].filter(
      arrayUtil.distinct
    );

    return (
      <div className="flex flex-auto overflow-hidden">
        <Mobilization
          editable
          history={history}
          mobilization={mobilization}
          blocks={blocks}
          widgets={widgets}
        />
        <GoogleFontsLoader fonts={fonts} />
      </div>
    );
  }
}

MobilizationsEditPage.propTypes = {
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired,
    header_font: PropTypes.string,
    body_font: PropTypes.string,
  }),
  blocks: PropTypes.array,
  widgets: PropTypes.array,
  history: PropTypes.any
};

export default MobilizationsEditPage;
