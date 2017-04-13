/**
 * Created by chamod on 4/13/17.
 */
var userSchema = mongoose.Schema({
    name: String,
    email: String
});
var User = mongoose.model("User", userSchema);