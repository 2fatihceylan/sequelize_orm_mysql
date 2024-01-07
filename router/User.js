const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {createTokens, validateToken} = require('../middlewares/JWT');

const {register, login, getUsers} = require('../controller/User');


router.post('/register',(request, response)=>{

    const {username, password} = request.body;

    bcrypt.hash(password,13).then((hash)=>{
        register({username, hash}).then((res)=>{
            response.json(res);
        }).catch((err)=>{
            console.log(err);
        }) 
    })

})


router.post('/login',(request, response)=>{

    const {username, password} = request.body;

    login({username}).then((res)=>{

        if(!res){
            response.json('wrong username')
        }

        bcrypt.compare(password, res.password).then((match)=>{
            if(!match){
                response.json('wrong password')                
            }
            else{

                const accessToken = createTokens({username: res.username, id: res.id});

                response.cookie('access-token', accessToken,{
                    maxAge: 60*60*24*30*1000,
                    httpOnly: true,
                })

                response.status(200).json({result:res, ok: 'OK'});            
            }
        })


    }).catch((err)=>{
        console.log(err);
    })

    
})



router.get('/getAllUsers',validateToken,(request, response)=>{

    getUsers().then((res)=>{
        response.status(200).json(res);
    }).catch((err)=>{
        response.json(err);
    })
})




module.exports = router;
