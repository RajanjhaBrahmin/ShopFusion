const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String
      },
      last_name: {
        type: String
      },
    email: {
        type: String,
        requried: true,
        unique: true,
      },
    password:{
        type:String,
        required:true,
    },
    user_token: {
        type: String
      },
      reset_password_token: {
        type: String
      },
    role:{
        type: String,
        enum:['admin','seller','customer'],
        default: 'admin',
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

});
module.exports = mongoose.model('User',UserSchema);
