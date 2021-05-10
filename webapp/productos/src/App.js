import './App.css';
import  Header  from './layout/Header';
import Body from './layout/Body';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

Axios.interceptors.request.use(function(config) {
  config.url = `${process.env.REACT_APP_API_BASE_URL}${config.url}`;
  return config;
})

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Body}/>
        <Route exact path="/login" component={Body}/>
        <Route exact path="/register" component={Body}/>
        <Route exact path="/products" component={Body}/>
      </Switch>
    </Router>
  );
}

export default App;
