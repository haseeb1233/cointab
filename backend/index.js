const {sequelize,users,posts} = require("./models")

const express = require("express")
const cors = require("cors")

const app = express()


// use cors and body parser
app.use(express.json())
app.use(cors())


// create users from the api
app.post("/users",async(req,res) => {
    try {
       const {id} =req.body
        const user = await users.findOne({
            where:{
                id
            }
        })

        if(user){
            res.status(200).json({msg:"user already created"})
        }else{
         
            const data = await users.create(req.body)

            res.status(200).json({
                msg:"user added successfully"
            })

        }

       

    } catch (error) {
        res.send(error.message)
    }
})


// get all users 
app.get("/users",async(req,res) =>{
    try {
        const data = await users.findAll()
        res.status(200).json({data})
    } catch (error) {
        res.send(error.message)
    }
})


// post user data to database
app.post("/posts", async (req,res) => {
     try {
        const data = await posts.bulkCreate(req.body)
        res.status(200).json({msg:"post added successfully"})
     } catch (error) {
        res.send(error.message)
     }
})


// get that user data from users
app.get("/posts",async(req,res) =>{
    try {
        const data = await posts.findAll()
        res.status(200).json({data})
    } catch (error) {
        res.send(error.message)
    }
})


// connect with database
sequelize.sync().then(()=>{
    app.listen(8080,()=>{
        console.log("Server Started")
    });
})


