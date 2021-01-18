import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from './routes/Login';
import Upload from './routes/Upload';

const App = () => {
    return <div>
        <Router>
            <Switch>
                {/* <Route exact path = "/" component={Login}/> */}
                {/* <Route exact path = "/users/:id/update" component={Upload}/> */}
                <Route exact path = "/" component={Upload}/>
            </Switch>
        </Router>
    </div>
}

export default App;