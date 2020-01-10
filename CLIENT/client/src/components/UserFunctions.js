import axios from 'axios'

export const register = newUser => {
    return axios.post('users/register', {
        user_id: newUser.user_id,
        funnel_id: newUser.funnel_id,
        name: newUser.name,
        password: newUser.password,
        identification_number: newUser.identification_number,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        message_yn: newUser.message_yn,
        dislike_genre: newUser.dislike_genre,
        wishlist: newUser.wishlist,
        noshow_count: newUser.noshow_count,
        join_date: newUser.join_date
    })
    .then(res => {
        if(res === null || res.data['error'] === "이미 존재하는 계정입니다."){
            console.log(res.data['error']);
            alert(res.data['error']);
            return null;
        } 
        console.log("회원가입 완료");
        alert("회원가입 되었습니다.");
        return res.data;
    })
    
}

export const login = user => {
    return axios.post('users/login', {
        user_id: user.user_id,
        password: user.password
    })
    .then(res => {
        if(res === null || res.data['error'] === "아이디와 비밀번호가 일치하지 않습니다."){
            console.log(res.data['error']);
            alert(res.data['error']);
            return null;
        }
        console.log("login");
        localStorage.setItem("usertoken", res.data)
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}