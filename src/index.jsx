import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import './index.css';
import { Abc } from './templates/Abc';
import { App } from './templates/App';
import { Page404 } from './templates/Page404';
import { HookFlow } from './templates/HookFlow';
import { CompoundComponents } from './templates/CompoundComponents';
import { UseImperativeHandle } from './templates/UseImperativeHandle';
import { UseAsync } from './templates/UseAsync';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/abc" component={Abc} />
        <Route path="/hook-flow" component={HookFlow} />
        <Route path="/compound-components" component={CompoundComponents} />
        <Route path="/use-imperative-handle" component={UseImperativeHandle} />
        <Route path="/use-async" component={UseAsync} />
        <Route path="/" component={App} exact />
        <Route path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
