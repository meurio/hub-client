import React from 'react'

import * as Paths from './../../Paths'
import { CloseButton } from './../../components'

import MatchWidgetMenu from './MatchWidgetMenu'


const MatchPage = ({ widget, mobilization, location, children }) => {
  return (
    <div className="flex-auto flex flex-column bg-silver gray relative">
      <MatchWidgetMenu widget={widget} mobilization={mobilization} location={location} />
      {children}
      <CloseButton
        dirty={false}
        path={Paths.editMobilization(mobilization.id)}
      />
    </div>
  )
}

export default MatchPage
