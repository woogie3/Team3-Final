const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post("/register", (req,res) => {
    const today = new Date()
    const userData = {
        user_id: req.body.user_id,
        funnel_id: req.body.funnel_id,
        name: req.body.name,
        password: req.body.password,
        identification_number: req.body.identification_number,
        email: req.body.email,
        role: req.body.role,
        phone: req.body.phone,
        message_yn: req.body.message_yn,
        dislike_genre: req.body.dislike_genre,
        wishlist: req.body.wishlist,
        noshow_count: req.body.noshow_count,
        join_date: today
    }

    User.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(user=> {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash,
                User.create(userData)
                .then(user => {
                    res.json({status: user.user_id + "님 회원가입 축하드립니다."})
                }).catch(err => {
                    res.send("error : " + err);
                })
            })
        } else {
            res.send({error: "이미 존재하는 계정입니다."})
            return error;
        }
    })
    .catch(err => {
        res.send("error: " + err)
    })
})

users.post('/login', (req, res) => {
    User.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token);
            } else {
                res.send({error:"아이디와 비밀번호가 일치하지 않습니다."})
                return error;
            }
        } else {
            res.status(400).json({error: "해당 계정이 없습니다."})
            res.send({error: "해당 계정이 없습니다."})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
        res.send("error: " + error)
    })
})

module.exports = users;
