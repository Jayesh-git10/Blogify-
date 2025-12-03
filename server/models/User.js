import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        require : true,
        unique : true
    },
    name:{
        type:String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    role:{
        type : String,
        enum : ["Admin","User"],
        default : 'User'
    },
    userImage:{
        type : String,
        default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqTalRtNSLyUU_nNW2Z8_qQO8hTz9bXUh_jg&s'
    },
    blog:{type : mongoose.Schema.Types.ObjectId , ref : 'blog'}
})

userSchema.pre('save', function(next) {
    if (!this.isModified("password")) return next();

    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('user',userSchema)

export default User