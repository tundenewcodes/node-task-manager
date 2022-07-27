const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

const errorHandlerMiddleWare = require('./middleware/error-handler')
console.log('thank you jesus')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')

require('dotenv').config()



// middleware

app.use(express.static('./public'))
app.use(express.json())




//routes


app.get('/hello', (req, res) => {
    res.send('task   manager nodeapp')
})

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3500



const start = async() => {
    try {

        await connectDB(process.env.DATABASE_URI)
        app.listen(
            port,
            console.log(` my server is runnig on port : ${port} ...`)
        )
    } catch (err) {
        console.log(err)
    }
}


start()