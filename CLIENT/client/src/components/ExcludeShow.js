import React from 'react';
import Button from '@material-ui/core/Button';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import jwt_decode from 'jwt-decode';

class ExcludeShow extends React.Component {
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            user_id: decoded.user_id
        })
    }
    
    excludeShow(show_id) {
        fetch('/api/exclude/' + show_id+'/'+this.state.user_id);
        alert("이 공연을 더이상 보지 않습니다")
        window.location.reload();
    }

    render() {
        return (
            <div className="middle-nav">
                <Button onClick={(e) => {this.excludeShow(this.props.show_id)}}><BlockRoundedIcon/>더이상 보지않기</Button>
            </div>
        )
    }
}

export default ExcludeShow; 