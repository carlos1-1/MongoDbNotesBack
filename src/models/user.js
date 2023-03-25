const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    name:{
        type: String,
        require:true,
        default:"name not registered"
    },
    email:{
        type: String,
        require:true
    },
    notes:[
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
            },
            important:{
                type: Boolean,
                default:false
            },
            finished:{
                type: Boolean,
                default:false
            }

        }
    ], 
        
})
//nombre, email, notas, notas importantes, notas completadas. estos 3 son arrays y las notas tienen (tittle, description y status)
module.exports= mongoose.model('User', userSchema)