import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Routes from './Routes';
import './index.css';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    return <Component history={history} {...props} />;
  };
  return Wrapper;
};

const RoutesWithRouter = withRouter((props) => <Routes {...props} />);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <RoutesWithRouter />
    </BrowserRouter>
  </React.StrictMode>
);
