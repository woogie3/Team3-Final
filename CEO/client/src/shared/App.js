import React, { Component } from 'react';
import { ManagementMenu, Analysis, QnA, QNAInsert, RegistorationMenu, QNAUpdate } from '../pages';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
// import Landing from '../components/Landing';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
// import Footers from '../components/Footers';
import CeoMain from '../pages/CeoMain';
import HeaderMenu from '../components/HeaderMenu';

class App extends Component {

      render(){
        return (
            <div className="App">
                <Router>
                <Switch>
                <Route exact path="/" component={CeoMain}/>
                </Switch>
                <div className="container">
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </div>
                <Switch>
                <Route path="/RegistorationMenu" component={RegistorationMenu}/>
                <Route path="/ManagementMenu" component={ManagementMenu}/>
                <Route path="/Analaysis" component={Analysis}/>
                <Route exact path="/QNA" component={QnA}/>
                <Route path="/QnA" component={QnA}/>
                <Route path="/QNAInsert" component={QNAInsert}/>
                <Route path="/QNAUpdate" component={QNAUpdate}/>
                </Switch>
                </Router>
            </div>
        );
    }
}

export default App;