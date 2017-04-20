/**
 * Created by chamod on 4/13/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    daily_data: { type : Array , default : [] }
});

userSchema.pre("save",function (next) {
    var u=this;
    User.findOne({email:u.email},function (err,user) {
        if(err) {
            next(err);
        }
        if(user!=null) {
            next(new Error("email already exists"));
        }
        else {
            next();
        }
    });
})


var User = mongoose.model("User", userSchema);

module.exports = User;