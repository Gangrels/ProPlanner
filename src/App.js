import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/hocs/PrivateRoute';
import WindowContextProvider from './components/hocs/window-context';
import './styles/main.css';
import './styles/animations.css';
import './utils/auth';
import './utils/errorInterceptors';
import './modules/Authentication/utils';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import Events from './pages/Events';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';
import EventForm from './pages/EventForm';
import GoalForm from './pages/GoalForm';
import Error404 from './pages/Error404';
import ErrorPopUp from './components/ErrorPopUp';

const LoginContainer = () => <Route path="/login" component={Login} />;

const DefaultContainer = props => (
  <div>
    <Navigation {...props} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/calendar" component={Calendar} />
      <Route exact path="/goals" component={Goals} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/event/add" component={EventForm} />
      <Route exact path="/event/:id" component={EventForm} />
      <Route exact path="/event/:id/edit" component={EventForm} />
      <Route exact path="/goal/add" component={GoalForm} />
      <Route exact path="/goal/:id" component={GoalForm} />
      <Route exact path="/goal/:id/edit" component={GoalForm} />
      <Route path="/settings" component={Settings} />
      <Redirect to="/page-not-found" />
    </Switch>
  </div>
);

export default class App extends Component {
  state = {
    networkStatus: 'online',
  };

  componentDidMount() {
    window.addEventListener('offline', () => this.setNetworkStatus('offline'), false);
    window.addEventListener('online', () => this.setNetworkStatus('online'), false);
  }

  setNetworkStatus(status) {
    const initialStatus = window.navigator.onLine ? 'online' : 'offline';
    const networkStatus = status || initialStatus;
    this.setState({ networkStatus });
  }

  getNetworkStatusTemplate() {
    const { networkStatus } = this.state;
    return (
      <div className={`network-status ${networkStatus}`}>
        {networkStatus === 'offline'
          ? 'Seems you are offline. Please check your connection'
          : 'You are online'}
      </div>
    );
  }

  render() {
    return (
      <div>
        <WindowContextProvider>
          {this.getNetworkStatusTemplate()}
          <Switch>
            <Route exact path="/login" component={LoginContainer} />
            <PrivateRoute path="/page-not-found" component={Error404} />
            <PrivateRoute component={DefaultContainer} />
          </Switch>
          <ErrorPopUp />
        </WindowContextProvider>
      </div>
    );
  }
}
