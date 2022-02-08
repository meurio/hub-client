import { expect } from 'chai'
// import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { shallow } from "enzyme";
import { EditorNew, EditorOld } from '.';
import { Content } from './__content__';
import type { Status } from "../../../../reducers";

describe('client/mobilizations/widgets/__plugins__/content/components/__content__', () => {
  const stubContext = { store: {} }
  const status: Status = "active";
  const kind: any = "content";
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
      settings: {}
    },
    editable: true,
    onEdit: jest.fn(),
    onCancelEdit: jest.fn(),
    update: jest.fn(),
    intl: {
      formatMessage: ({ defaultMessage }: any): string => defaultMessage
    }
  }

  it('should render draft.js editor when settings content is JSON and have "entityMap" key', () => {
    const contentWidget = shallow(<Content {...props} />, { context: stubContext })
    const widget = {
      settings: {
        content: '{ "entityMap": { "0": { "data": { "src": "https://s3.amazonaws.com/hub-central/uploads/1466044266_%5Bminhasampa%5Dmarca_footer.png" }, "type": "image", "mutability": "IMMUTABLE" } }, "blocks": [ { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "92bdc2", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "bbbc16", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "b2c947", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [ { "style": "center", "offset": 0, "length": 1 } ], "data": {}, "depth": 0, "type": "atomic", "key": "58ffba", "entityRanges": [ { "offset": 0, "length": 1, "key": 0 } ], "text": " " } ] }'
      }
    }
    contentWidget.setProps({ widget })
    expect(contentWidget.find(EditorNew).length).to.equal(1)
  })

  it('should render wysihtml editor when settings content is HTML', () => {
    const contentWidget = shallow(<Content {...props} />, { context: stubContext })
    const widget = {
      settings: {
        content: '<div style="text-align: center;"><span>Clique aqui para editar o text...</span></div>'
      }
    }
    contentWidget.setProps({ widget })
    expect(contentWidget.find(EditorOld).length).to.equal(1)
  })

  it('should render draft.js editor when forceRenderNewEditor is true', () => {
    const contentWidget = shallow(<Content {...props} />, { context: stubContext })
    const widget = {
      settings: {
        content: '<div style="text-align: center;"><span>Clique aqui para editar o text...</span></div>'
      }
    }
    contentWidget.setProps({ widget })
    contentWidget.setState({ forceRenderNewEditor: true })
    expect(contentWidget.find(EditorNew).length).to.equal(1)
  })
})
