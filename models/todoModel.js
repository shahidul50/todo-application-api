import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true,'please enter a title']
      },
      description: {
        type: String,
        required: [true,'please enter a description']
      },
      completed: {
        type: Boolean,
        default: false,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: [true, 'User is required for todo'],
      }
    },  
    {
        timestamps: true,
    }
  )

  todoSchema.methods.completeTodo = function () {
    this.completed = true
    return this.save()
  }
const Todos = mongoose.model('Todos',todoSchema)

export default Todos