const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();

const cookieparser = require('cookie-parser');

const db = require('./models')



app.use(express.json());
app.use(cors());
app.use(cookieparser());






const userRouter = require('./router/User');
app.use('/users', userRouter);






db.sequelize.sync().then((req)=>{
    app.listen(5000,()=>{
        console.log('server started...');
    })
})



