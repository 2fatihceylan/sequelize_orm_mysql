const {User} = require('../models');


const register = async({username,hash}) => {

    return await User.create({
        username: username,
        password: hash
    })
    .catch((err)=>{
        console.log(err);
    })

}


const login = async({username}) => {

    return await User.findOne({
        where: {
            username: username
        }
    })
    .catch((err)=>{
        console.log(err);
    })

}



const getUsers = async()=>{
    return await User.findAll()
    .catch((err)=>{
        console.log(err);
    })
}



module.exports = {
    register,
    login,
    getUsers
}