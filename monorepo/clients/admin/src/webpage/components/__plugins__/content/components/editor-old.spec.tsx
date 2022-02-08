/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'
import type { Status, Kind } from "../../../../reducers";

// import * as mock from '../../../../../utils/mock'
import EditorOld from './editor-old';

describe('client/mobilizations/widgets/__plugins__/content/components/editor-old', () => {
  let wrapper
  const status: Status = 'active';
  const kind: Kind = "draft";
  const props = {
    mobilization: {
      id: 2,
      color_scheme: 'meu-rio',
      header_font: 'headerFont',
      body_font: 'bodyFont',
      name: 'Lorem',
      status,
      slug:  'lorem',
      goal: 'Lorem ipsum dolor',
      facebook_share_title: 'Facebook share title',
      facebook_share_description: 'Facebook share description',
      facebook_share_image: 'http://facebook.com/share-image.png',
      updated_at: new Date().toISOString(),
      user_id: 1,
      language: "pt-br",
      created_at: new Date().toISOString(),
      community_id: 2
    },
    widget: {
      id: 1,
      kind,
      sm_size: 3,
      md_size: 3,
      lg_size: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      block_id: 1,
      settings: {
        content: ''
      }
    },
    editable: true,
    onEdit: jest.fn(),
    onCancelEdit: jest.fn(),
    update: jest.fn()
  }

  beforeAll(() => {
    wrapper = shallow(<EditorOld {...props} />)
  })

  describe('#render', () => {
    xit('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
