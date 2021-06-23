import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../paginas/home';
import Editar from '../paginas/editar';

const Routes: React.FC = () => (
     <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/editar/:id" component={Editar} />
     </Switch>
);

export default Routes;