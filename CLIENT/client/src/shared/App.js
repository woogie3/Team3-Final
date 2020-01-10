import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Register,Login,Home ,QNA,MyShow,ClientInformation,ClientInformation2,Schedule,QNAInsert,QNAUpdate } from '../pages';
import Menu from '../components/Menu';

class App extends Component {
    
    render() {
        let menu;
        if (localStorage.usertoken) {
            menu = <Menu/> 
         } else { menu = ''}

        return (
            <div>
                {menu}
                <Route exact path="/" component={Login}/>
                <Route path="/main" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route path="/QNA" component={QNA}/>
                <Route path="/MyShow" component={MyShow}/>
                <Route path="/clientInformation" component={ClientInformation}/>
                <Route path="/clientInformation2" component={ClientInformation2}/>
                <Route path="/Schedule" component={Schedule}/>
                <Route path="/QNAInsert" component={QNAInsert}/>
                <Route path="/QNAUpdate" component={QNAUpdate}/>
                <Route exact path="/register" component={Register}/>
            </div>
        );
    }
}

export default App;