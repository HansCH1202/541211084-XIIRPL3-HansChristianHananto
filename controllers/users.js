const User = require('../model/user')

module.exports = {
    index: async (req, res) => {
        try {
            const users = await User.find()
            if(users.length > 0) {
                res.status(200).json({
                    status: true,
                    data: users,
                    method: req.method,
                    url: req.url
                })
            } else {
                res.json({
                    status: false,
                    message: 'Data masih kosong'
                })
            }
        } catch (error) {
            res.status(400).json({succes: false, error: error.message});
        }
    },
    store: async (req, res) => {
        try {
        const user = await User.create(req.body)
            res.status(200).json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: 'Data berhasil ditambahkan'
            })
        } catch (error) {
            res.status(400).json({success: false, error: error.message})
        }
    },
    update: (req, res) => {
        const id = req.params.id
        users.filter(user => {
            if (user.id == id) {
                user.nama = req.body.nama
                user.email = req.body.email
                return user
            }
        })
        res.json({
            status: true,
            data: users,
            method: req.method,
            url: req.url,
            message: 'Data berhasil diubah'
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        users = users.filter(user => user.id != id)
    
        res.json({
            status: true,
            data: users,
            method: req.method,
            url: req.url,
            message: 'Data berhasil dihapus'
        })
    }
}