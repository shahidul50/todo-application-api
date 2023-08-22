import Todo from '../models/todoModel.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


// @desc    Get All Todos for user
// @route   GET /api/todos
// @access  Private
const getAllTodos = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    console.log('test-server:',user)
    const todos = await Todo.find({user})
    if(todos){
        res.status(200).json({todos})
    }else{
        res.status(400)
        throw new Error('Todos not Found')
    }
})

// @desc    Add Todo for user
// @route   POST /api/todos/
// @access  Private
const addTodo = asyncHandler(async(req,res) => {
     const user = await User.findById(req.user._id);
    if(user){
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            user: user._id
         })
         //save todo
         const result = await todo.save()
         if(result){
            res.status(201).json({
                id: result._id,
                title: result.title,
                description: result.description
            })
         }else{
            res.status(400)
            throw new Error('Invalid todo data')
         }
    }else{
        res.status(400)
        throw new Error('User Not Found')
    }
})

// @desc    Update Todo for user
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async(req,res) => {
    const todo = await Todo.findById(req.params.id)
      if(todo){
        todo.title = req.body.title || todo.title
        todo.description = req.body.description || todo.description
        todo.completed = req.body.completed || todo.completed
    
        //updated user todo
        const updatedTodo = await todo.save();
        res.json({updatedTodo})
     }else{
        res.status(404);
        throw new Error('Todo Not Found')
    }
})
// @desc    Delete Todo for user
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async(req,res) => {
    const todo = await Todo.findById(req.params.id)
    if(todo){
        const result = await Todo.deleteOne({_id: todo._id})
        if(result){
            res.status(200).json({data: todo })
        }else{
            res.status(400)
            throw new Error('Delete not Successfully')
        }
    }else{
        res.status(400)
        throw new Error('Todo not found')
    }
})

export {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo
}