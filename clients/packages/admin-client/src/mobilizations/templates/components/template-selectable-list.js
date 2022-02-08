import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage, intlShape } from 'react-intl'
import classnames from 'classnames'

// Global module dependencies
import SelectableList from 'components/selectable-list'
import FilterableSearchBar from 'components/filterable-search-bar'

var styles = require('exenv').canUseDOM ? require('./template-selectable-list.scss') : {}

const TemplateSelectableList = props => {
  const {
    templates,
    filterableTemplates,
    setSelectedIndex,
    selectedIndex,
    handleSelectItem,
    handleGoBack,
    intl
  } = props

  const item = filterableTemplates.filter(item => item.id === selectedIndex)[0]

  return (
    <div className='mobilization-templates-selectable-list'>
      <FilterableSearchBar
        list={templates}
        placeholder={intl.formatMessage({
          id: 'templates.components--selectable-list.filterable-search-bar.placeholder',
          defaultMessage: 'Busque um template'
        })}
      />

      <div className='bg-white rounded-bottom' style={{ padding: '1.6rem 2rem' }}>
        <SelectableList
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          list={filterableTemplates}
          emptyListText={
            <FormattedMessage
              id='templates.components--selectable-list.empty-list-text'
              defaultMessage='Não existe nenhum template com esse nome'
            />
          }
        />
        <div className={styles.buttonContainer}>
          {handleGoBack !== undefined ? (
            <div className='col-4'>
              <button
                onClick={() => handleGoBack()}
                className={classnames('btn h3 white p2 rounded bg-gray', styles.button)}
              >
                <FormattedMessage
                  id='templates.components--selectable-list.button.back'
                  defaultMessage='Voltar'
                />
              </button>
            </div>
          ) : undefined}
          <div className={classnames(!handleGoBack ? 'col-12' : 'col-8 pl1')}>
            <button
              disabled={!item}
              onClick={() => handleSelectItem(item)}
              className={classnames(
                'btn h3 white p2 rounded',
                !item ? 'bg-gray95' : 'bg-pagenta',
                styles.button
              )}
            >
              <FormattedMessage
                id='templates.components--selectable-list.button.next'
                defaultMessage='Continuar'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

TemplateSelectableList.propTypes = {
  templates: PropTypes.array.isRequired,
  filterableTemplates: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func,
  intl: intlShape.isRequired
}

export default TemplateSelectableList
