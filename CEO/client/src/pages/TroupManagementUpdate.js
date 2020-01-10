import React, {Component} from 'react';
import TroupUpdate from 'components/TroupUpdate';









class TroupManagementUpdate extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            troupManagementUpdate: '',
            completed: 0,
            
        }
        this.stateRefresh = this.stateRefresh.bind(this);
    }

    stateRefresh = () => {
        this.setState({
            troupManagementUpdate: '',
            completed: 0,
        
       });
        this.callApi()
        .then(res => this.setState({troupManagementUpdate: res}))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.callApi()
        .then(res => this.setState({troupManagementUpdate: res}))
        .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/troupManagementUpdate1');
        const body = await response.json();
    
        return body;
    }

    callApi = async () => {
        const response = await fetch('/api/troupManagementUpdate2');
        const body = await response.json();
    
        return body;
    }
    

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        
        
        return(
            <div>
                <TroupUpdate/>

                


                
                
            </div>

                    
                
        );


    };
}
             export default TroupManagementUpdate;