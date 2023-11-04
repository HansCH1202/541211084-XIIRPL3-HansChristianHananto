const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nama: {
        type: 'string',
        required: [true, 'Silahkan isi nama kamu'],
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Silahkan isi email valid kamu']
    }
})

module.exports = mongoose.model('User', userSchema)