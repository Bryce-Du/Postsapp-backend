const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    name: {
        type: String
    },
    pronouns: {
        type: [String],
        enum: ["he/him", "she/her", "they/them"]
    },
    location: {
        type: String
    }
})

userSchema.statics.signup = async function ({ email, password }) {
    //validations
    if (!email || !password) {
        throw Error("All fields required")
    }
    if (!validator.isEmail(email)) {
        throw Error("Must be valid Email")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email already in use")
    }

    //encryption
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    return user
}

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('Password is incorrect.')
    }
    throw Error('No such user exists.')
}

const User = mongoose.model('user', userSchema);

module.exports = User;