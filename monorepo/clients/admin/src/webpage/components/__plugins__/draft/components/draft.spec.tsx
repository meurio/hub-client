/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { shallow } from "enzyme"
import Draft from './draft';
import type { Kind, Status } from "../../../../reducers";
import widgetsConfig from '../../config';

describe('client/mobrender/widgets/draft/components/draft', () => {
  const kind: Kind = "draft";
  const status: Status = "active";
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
      settings: {},
      sm_size: 3,
      md_size: 3,
      lg_size: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      block_id: 1
    },
    update: jest.fn(),
    intl: { formatMessage: ({ defaultMessage }) => defaultMessage }
  }
  const widgets = widgetsConfig(props.mobilization, props.widget, {
    intl: props.intl
  })

  it('should render without crashed', () => {
    const draft = shallow(<Draft {...props} />)
    expect(draft).to.be.ok
  })

  it('should render buttons to update kind', () => {
    const plugins = widgets.filter(w => w.kind !== 'draft')
    const draft = shallow(<Draft {...props} />)
    expect(draft.find('DraftButton').length).to.equal(plugins.length)
  })

  // it('should pass to update method widget props when clicked button', () => {
  //   const update = jest.fn();
  //   const draft = shallow(
  //     <Draft {...props} update={update} />
  //   )
  //   const button = draft.find('DraftButton').at(1)
  //   button.find('button').simulate('click')

  //   // Assert item to item
  //   expect(update.mock.calls.length).to.equal(1)
  // })
})
