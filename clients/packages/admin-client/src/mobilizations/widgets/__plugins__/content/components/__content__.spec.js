import React from 'react'
import { expect } from 'chai'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { EditorNew } from 'mobilizations/widgets/__plugins__/content/components'
import { Content } from 'mobilizations/widgets/__plugins__/content/components/__content__'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('client/mobilizations/widgets/__plugins__/content/components/__content__', () => {
  let contentWidget
  const stubContext = { store: {} }
  const props = {
    mobilization: {},
    widget: {
      settings: {}
    },
    editable: true,
    onEdit: () => {},
    onCancelEdit: () => {},
    widgetUpdate: () => {},
    auth: {}
  }

  beforeEach(() => {
    contentWidget = shallowWithIntl(<Content {...props} intl={intl} />, { context: stubContext })
  })

  it('should render draft.js editor when settings content is JSON and have "entityMap" key', () => {
    const widget = {
      settings: {
        content: '{ "entityMap": { "0": { "data": { "src": "https://s3.amazonaws.com/hub-central/uploads/1466044266_%5Bminhasampa%5Dmarca_footer.png" }, "type": "image", "mutability": "IMMUTABLE" } }, "blocks": [ { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "92bdc2", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "bbbc16", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [], "data": {}, "depth": 0, "type": "unstyled", "key": "b2c947", "entityRanges": [], "text": "" }, { "inlineStyleRanges": [ { "style": "center", "offset": 0, "length": 1 } ], "data": {}, "depth": 0, "type": "atomic", "key": "58ffba", "entityRanges": [ { "offset": 0, "length": 1, "key": 0 } ], "text": " " } ] }'
      }
    }
    contentWidget.setProps({ widget })
    expect(contentWidget.find(EditorNew).length).to.equal(1)
  })

  it('should render wysihtml editor when settings content is HTML', () => {
    const widget = {
      settings: {
        content: '<div style="text-align: center;"><span>Clique aqui para editar o text...</span></div>'
      }
    }
    contentWidget.setProps({ widget })
    expect(contentWidget.find('Connect(EditorOld)').length).to.equal(1)
  })

  it('should render draft.js editor when forceRenderNewEditor is true', () => {
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
