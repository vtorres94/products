import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Body from '../layout/Body';
import Login from './login-components/login';
import Register from './login-components/register';
import PasswordRecovery from './login-components/passwordRecovery';

interface IRoutesProps {}

const Routes = (props: IRoutesProps) => {
    return(
        <Router>
            <Switch>
            <Route exact path="/" component={Body}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/password-recovery" component={PasswordRecovery}/>
            <Route exact path="/products" component={Body}/>
            </Switch>
      </Router>
    );
}

export default Routes;