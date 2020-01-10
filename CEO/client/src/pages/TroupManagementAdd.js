import React, {Component} from 'react';
import TroupAdd from 'components/TroupAdd';







class TroupManagementAdd extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            troupManagementAdd: '',
            
            
        }
        this.stateRefresh = this.stateRefresh.bind(this);
    }

    stateRefresh = () => {
        this.setState({
            troupManagementAdd: '',
            
        
       });
        this.callApi()
        .then(res => this.setState({troupManagementAdd: res}))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.callApi()
        .then(res => this.setState({troupManagementAdd: res}))
        .catch(err => console.log(err));
        
    }

    callApi = async () => {
        const response = await fetch('/api/troupManagementAdd1');
        const body = await response.json();
    
        return body;
    }



    callApi = async () => {
        const response = await fetch('/api/troupManagementAdd2');
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
            
                <TroupAdd/>
                
                
                
                
                
            </div>

                    
                
        );


    };
}
             export default TroupManagementAdd;