import React from 'react';
import ReactDOM from 'react-dom';

/* Router */
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

/* Container Components*/
import { App, Home, DashBoard, TestComponent, Data, ZingChartsExample, TrialVersion, Analysis, ResultChartView } from 'containers';

/* Redux */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(reducers, applyMiddleware(thunk));

let rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="dashBoard" component={DashBoard}/>
                <Route path="testComponent" component={TestComponent}/>
                <Route path="data" component={Data}/>
                <Route path="zingChartsExample" component={ZingChartsExample}/>
                <Route path="trialVersion" component={TrialVersion}/>
                <Route path="Analysis" component={Analysis}/>
                <Route path="resultChartView" component={ResultChartView}/>
                </Route>
            </Router>
        </Provider>, rootElement
);
