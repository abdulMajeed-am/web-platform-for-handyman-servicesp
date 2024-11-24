const ConnectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
const app=express();
app.use(cors())
app.use(express.json());
ConnectToMongo();
const Port=5000;
app.use('/api/admin',require('./router/admin-router'))
app.use('/api/worker',require('./router/worker-router'))
app.use('/api/user',require('./router/user-router'))
app.use('/api/upload',express.static('./upload/service'))
app.use('/api/category',express.static('./upload/category'))
app.use('/api/worker',express.static('./upload/worker-profile'))
app.listen(Port,()=>console.log('listening on port '+Port));