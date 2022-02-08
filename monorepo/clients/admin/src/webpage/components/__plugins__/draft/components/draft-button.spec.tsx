/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import DraftButton from './draft-button'

describe('client/mobrender/widgets/draft/components/draft-button', () => {
  const kind: any = "draft";
  const properties = {
    icon: 'text',
    label: 'Texto',
    updateKind: jest.fn(),
    widget: {
      id: 1,
      kind,
      sm_size: 3,
      md_size: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      block_id: 1,
      lg_size: 4
    }
  }

  it('should render without crashed', () => {
    const draftButton = shallow(<DraftButton {...properties} />)
    expect(draftButton.find("button").length).toEqual(1);
  })
})
