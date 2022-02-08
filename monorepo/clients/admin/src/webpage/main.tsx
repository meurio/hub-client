import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Application from "./Application";
import Mobilization from "./components/page";
import './styles/main.scss';

const Main: React.FC = () => (
  <Application>
    <Router>
      <Routes>
        <Route path="/" element={<Mobilization />} />
        <Route path="/:id" element={<Mobilization />} />
      </Routes>
    </Router>
  </Application>
);

render(
  <Main />
, document.querySelector('#root'));
