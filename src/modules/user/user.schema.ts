import { Schema } from 'mongoose';


export const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

    firstName: {
      type: String,
      trim: true
    },
  
    lastName: {
      type: String,
      trim: true
    },
  
    created: {
      type: Date,
      default: Date.now
    },
  
    updated: {
      type: Date,
      default: Date.now
    },
  
}, { collection: 'users' });
