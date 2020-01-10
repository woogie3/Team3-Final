 import React, {Component} from 'react';
 import jwt_decode from 'jwt-decode';

 class Profile extends Component {
     constructor() { 
         super()
         this.state={
            user_id: '',
            name: '',
            phone:'',
            identification_number: '',
            email:''
        }
     }

     componentDidMount() {
         // usertoken으로 써야 작동함
         const token = localStorage.usertoken
         const decoded = jwt_decode(token)
         this.setState({
             user_id: decoded.user_id,
             name: decoded.name,
             identification_number: decoded.identification_number,
             phone: decoded.phone,
             email: decoded.email
         })
     }

     
     render() {
         return (
             <div className="container">
                 <div className="jumbotron mt-5">
                     <div className="col-sm-8 mx-auto">
                         <h1 className="text-center"> PROFILE </h1>
                     </div>
                     <table className="table col-md-6 mx-auto">
                         <tbody>
                             <tr>
                                <td>ID</td>
                                <td>{this.state.user_id}</td>
                             </tr>
                             <tr>
                                <td>이름</td>
                                <td>{this.state.name}</td>
                             </tr>
                             <tr>
                                <td>폰번호</td>
                                <td>{this.state.phone}</td>
                             </tr>
                             <tr>
                                <td>사업자 번호</td>
                                <td>{this.state.identification_number}</td>
                             </tr>
                             <tr>
                                <td>이메일</td>
                                <td>{this.state.email}</td>
                             </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
         )
     }
 }

 export default Profile;