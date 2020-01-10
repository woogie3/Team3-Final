import React from 'react';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import jwt_decode from 'jwt-decode';
import '../css/AddWishlist.css';
class AddWishlist extends React.Component {
    constructor() {
        super()
        this.state = {
            added: '',
            wishlist: '',
            change: "false"
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)

        this.setState({
            user_id: decoded.user_id
        })
        this.getWishist()
            .then(res => {
                this.setState({ wishlist: res })
                this.isWishist();
            })
            .catch(err => console.log(err));

    }

    componentWillMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        
        this.setState({
            user_id: decoded.user_id
        })
        this.getWishist()
            .then(res => {
                this.setState({ wishlist: res })
                this.isWishist();
            })
            .catch(err => console.log(err));
    }

    componentDidUpdate() {
        console.log(this.state.change)
        if (this.state.change === "true") {
            this.getWishist()
                .then(res => {
                    this.setState({ wishlist: res })
                    this.isWishist();
                })
                .catch(err => console.log(err));
                this.setState({
                    change:'false'
                });
        }
    }
    isWishist() {

        let wish = this.state.wishlist[0].wishlist.split(',');
        for (let i = 0; i < wish.length; i++) {
            console.log("공연번호" + wish[i]);
            console.log("아이디" + this.props.show_id);
            if (wish[i] === this.props.show_id) {
                this.state.added = "add";
            }
        }
    }

    getWishist = async () => {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        
        const response = await fetch('/api/getWish/' + decoded.user_id);
        const body1 = await response.json();
        return body1;
    }

    whishlistAdd(show_id) {
        fetch('/api/addWish/' + show_id + '/' + this.state.user_id);
        
        alert("찜하기 등록");
        this.setState({
            added : 'add',
            change:'true'
        });
    }

    render() {
        let button;
        if (this.state.added === "add") {
            button = <Button><FavoriteIcon ></FavoriteIcon>찜하기</Button>
        } else {
            button = <Button id="wish" className="whishlistAdd" onClick={(e) => { this.whishlistAdd(this.props.show_id) }} ><FavoriteBorderIcon />찜하기</Button>
        }
        return (
            <div className="middle-nav">
                {button}
            </div>
        )
    }
}

export default AddWishlist; 