/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallow } from "enzyme";
import type { Status } from "../../../../reducers";
import Form from './__form__'

describe('client/mobilizations/widgets/__plugins__/form/components/__form__', () => {
  const status: Status = 'active';
  const kind: any = "draft";
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
        finish_message_type: 'share'
      }
    },
    block: {},
    editable: true,
    configurable: true,
    hasNewField: false,
    intl: {
      formatMessage: ({ defaultMessage }: any): string => defaultMessage
    }
  }

  it('should render without crash', () => {
    const wrapper = shallow(<Form {...props} />)
    expect(wrapper).to.be.ok
  })
})
