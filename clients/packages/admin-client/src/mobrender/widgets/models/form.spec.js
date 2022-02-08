import { expect } from 'chai'
import ModelForm, { mapStateToProps } from './form'

describe('ModelForm = (config) => (Component)', () => {
  it('when config a ModelForm should return a function', () => {
    const HOC = ModelForm({ form: 'testForm', fields: ['name', 'last_name'] })
    expect(typeof HOC).to.be.equal('function')
  })

  describe('mapStateToProps = (state, { widget }) => { initialValues }', () => {
    const colorScheme = '#c7c7c7'
    const ownProps = {
      widget: {
        id: 1,
        settings: { title: 'Donation' }
      },
      mobilization: { color_scheme: colorScheme }
    }

    it('should map initalValues with widget.settings by default', () => {
      const props = mapStateToProps(undefined)(undefined, ownProps)
      expect(props).to.deep.equal({
        initialValues: ownProps.widget.settings,
        colorScheme
      })
    })

    describe('mapInitialValues passed like function', () => {
      it('should extend initialValues', () => {
        const mapInitialValues = (widget) => ({
          id: widget.id
        })

        const props = mapStateToProps(mapInitialValues)(undefined, ownProps)
        expect(props).to.deep.equal({
          initialValues: {
            ...ownProps.widget.settings,
            id: ownProps.widget.id
          },
          colorScheme
        })
      })

      it('should override default initialValues', () => {
        const title = 'has changed'
        const mapInitialValues = (widget) => ({ title })

        const props = mapStateToProps(mapInitialValues)(undefined, ownProps)
        expect(props).to.deep.equal({
          initialValues: {
            title
          },
          colorScheme
        })
      })
    })
  })
})
