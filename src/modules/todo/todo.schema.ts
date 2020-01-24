import { Schema, ObjectId } from 'mongoose';


export const TodoSchema = new Schema({
    owner: {
        type: ObjectId,
        required: true,
    },

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    items: [{
        text: {
            type: String,
            required: true,
            trim: true,
        },
        done: {
            type: Boolean,
            default: false,
        }
    }],
  
    created: {
      type: Date,
      default: Date.now
    },
  
    updated: {
      type: Date,
      default: Date.now
    },
  
}, { collection: 'todos' });
