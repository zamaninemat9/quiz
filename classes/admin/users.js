const adminUsersModel = require('./../../model/adminUsers');
const prHlp = require('./../../helpers/persian_date_helper');
const enHlp = require('./../../helpers/encrypt_helper');
const ck = require('./../../helpers/admin_auth');
module.exports = new class users {
    async get(req, res) {
        let data = await adminUsersModel.find().exec();
        let arr = [];
        for (let i in data) {
            if (data[i].username !== 'administrator') {
                arr.push({
                    username: data[i].username,
                    firstName: data[i].firstName,
                    lastName: data[i].lastName,
                    created: prHlp.get_def_date(data[i].created)
                })
            }
        }
        res.send({
            status: 200,
            data: arr
        })
    }

    async single(req, res) {
        let data = await adminUsersModel.findOne({_id: req.params.id}).exec();
        if (!data) return res.send({
            status: 402,
            description: err['4022']
        });
        res.send({
            status: 200,
            data: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                created: prHlp.get_def_date(data.created)
            }
        })
    }

    async remove(req, res) {
        let data = await adminUsersModel.findOne({_id: req.params.id}).exec();
        if (!data) return res.send({
            status: 402,
            description: err['4022']
        });
        await adminUsersModel.findByIdAndDelete({_id: req.params.id}).exec();
        res.send({
            status: 200,
            description: err['200']
        })
    }

    async update(req, res) {
        let data = await adminUsersModel.findOne({_id: req.params.id}).exec();
        if (!data) return res.send({
            status: 402,
            description: err['4022']
        });
        let {username, firstName, lastName} = req.body;
        let body = {
            username,
            firstName,
            lastName
        };
        await adminUsersModel.findOneAndUpdate({_id: req.params.id}, body).exec();
        res.send({
            status: 200,
            description: err['200']
        })
    }

    async insert(req, res) {
        let {username, firstName, lastName, password} = req.body;
        let data = await adminUsersModel.findOne({username: req.params.id}).exec();
        if (data) return res.send({
            status: 402,
            description: err['4023']
        });
        let ps = await enHlp.hash({
            password
        });
        adminUsersModel.create({
            username,
            firstName,
            lastName,
            salt: ps.salt,
            hash: ps.hash,
            created: new Date()
        }, (e, d) => {
            if (e) return res.send({
                status: 500,
                description: err['500']
            });
            res.send({
                status: 200,
                description: err['200']
            })
        })
    }

    changePassword(req, res) {
        ck(req)
            .then(async username => {
                let {newPassword, oldPassword, confirmPassword} = req.body;
                if (newPassword !== confirmPassword) return res.send({
                    status: 200,
                    description: err['4024']
                });
                let data = await adminUsersModel.findOne({username}).exec();
                let checkPs = await enHlp.check({
                    password: oldPassword,
                    salt: data.salt,
                    hash: data.hash,
                });
                if (!checkPs) return res.send({
                    status: 402,
                    description: err['4025']
                });
                let ps = await enHlp.hash({
                    password: newPassword
                });
                await adminUsersModel.findOneAndUpdate({username}, {
                    salt: ps.salt,
                    hash: ps.hash,
                }).exec();
                res.send({
                    status: 200,
                    description: err['200']
                })
            })
            .catch(() => {
                res.send({
                    status: 403
                })
            })

    }
};