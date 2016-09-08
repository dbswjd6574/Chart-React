import React from 'react';
import ReactDOM from 'react-dom';

/* Router */
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

/* Container Components*/
import { App, Home, Login, Register, DrawChart } from 'containers';

/* Redux */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

let rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="drawChart" component={DrawChart}/>
                </Route>
            </Router>
        </Provider>, rootElement
);
