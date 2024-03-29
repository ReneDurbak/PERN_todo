//RESTFUL API WITH POSTGRES

const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json()) //access to req.body so we can get JSON data


//ROUTES


//create a todo

app.post("/todos", async(req,res)=>{
    //await
    try{
       const {description} = req.body
       const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

       res.json(newTodo.rows[0])
    }catch(err){
        console.error(err.message)
    }

})


//get all todos

app.get("/todos", async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows )

    }catch(err){
        console.error(err.message)
    }

})


//get a todo

app.get("/todos/:id", async(req,res)=>{
    try {
        const{id}= req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//update a todo

app.put("/todos/:id", async(req,res)=>{
    try {
        const {description}= req.body
        const {id}= req.params
        const updatetodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description,id])

        res.json("todo was updated")
        
    } catch (error) {
        console.error(error.message)
    }
})


//delete a todo

app.delete("/todos/:id", async(req,res)=>{
    try {
        
        const {id}= req.params
        const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo was deleted")

    } catch (error) {
        console.error(error.message)

    }
})





app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})