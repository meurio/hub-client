import React, { Component } from 'react'
import { Mobilization } from './lib'
/*import { DraftPlugin } from '@bonde-webpage/plugins/draft'*/
import './lib/styles/main.scss'

/*const plugins = [
  { 
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true }
  }
]*/

class App extends Component {
  render() {
    return (
      <Mobilization />
    )
  }
}

export default App
