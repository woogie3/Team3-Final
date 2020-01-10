import React, {Component} from 'react';
import ShowAdd from 'components/ShowAdd';


class ShowManagementAdd extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showManagementAdd: '',
            
            
        }
        this.stateRefresh = this.stateRefresh.bind(this);
    }

    stateRefresh = () => {
        this.setState({
            showManagementAdd: '',
            
        
       });
        this.callApi()
        .then(res => this.setState({showManagementAdd: res}))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        //this.timer = setInterval(this.progress, 20);
        this.callApi()
        .then(res => this.setState({showManagementAdd: res}))
        .catch(err => console.log(err));
        
    }

    callApi = async () => {
        const response = await fetch('/api/showManagementAddShow');
        const body = await response.json();
    
        return body;
    }

    callApi = async () => {
        const response = await fetch('/api/showManagementAddGenre');
        const body = await response.json();
    
        return body;
    }

    callApi = async () => {
        const response = await fetch('/api/showManagementAddShowDate');
        const body = await response.json();
    
        return body;
    }

    callApi = async () => {
        const response = await fetch('/api/showManagementAddAudiencePrice');
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
                <ShowAdd/>
                
                
            </div>

                    
                
        );


    };
}
             export default ShowManagementAdd;