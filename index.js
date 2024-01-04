import express from 'express'
import connection from './databases/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import noteRouter from './src/modules/note/note.routes.js';
const app = express()
const port = 3000

connection.sync() 

app.use(express.json())

app.use(userRouter)
app.use(noteRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))