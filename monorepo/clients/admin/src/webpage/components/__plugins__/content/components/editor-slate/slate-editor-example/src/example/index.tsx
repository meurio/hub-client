
import { createBrowserHistory } from "history";
import { Router } from 'react-router';
// import { version } from '../../package.json'
import './index.css';
import Home from './pages/Home';


const history = createBrowserHistory()

export default function HomePage(): JSX.Element {
  return <Router history={history}>
    <Home title='Nossas - SlateJS Editor' version='5.0.0' />
  </Router>
}
