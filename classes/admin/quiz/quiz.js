const quizModel = require('./../../../model/admin/quiz');
const prHlp = require('./../../../helpers/persian_date_helper');

module.exports = new class login {
    async index(req, res) {
        let data = await quizModel.find().exec();
        for (let i in data) {
            data[i].start = prHlp.get_def_date(data[i].startDate);
            data[i].expire = prHlp.get_def_date(data[i].expireDate);
        }
        res.render('admin/quiz/index',{data: data})
    }

    create(req,res) {
        res.render('admin/quiz/create');
    }

    async edit(req,res) {
        let data = await quizModel.findOne({_id: req.params.id}).exec();
        res.render('admin/quiz/edit',{data: data});
    }

    async insert(req, res) {
        let {title,expireDate,startDate,description,catId} = req.body;
        quizModel.create({
            title,
            expireDate,
            startDate,
            description,
            // catId, // todo: uncomment this
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
        });
    }

    async update(req, res) {
        let {title,id,expireDate,startDate,description,catId} = req.body;
        let body = {
            title,
            expireDate,
            startDate,
            description,
            // catId, todo: change this with object id.
            updated: new Date()
        }
        await quizModel.findOneAndUpdate({_id: id}, body).exec();
        res.send({
            status: 200,
            description: err['200']
        });
    }

    async delete(req,res) {
        let data = await quizModel.findOne({_id: req.params.id}).exec();
        if (!data) return res.send({
            status: 402,
            description: err['4022']
        });
        await quizModel.findByIdAndDelete({_id: req.params.id}).exec();
        res.send({
            status: 200,
            description: err['200']
        })
    }

    async get(req, res) {
        let data = await quizModel.find().exec();
        let arr = [];
        let createAt = null;
        for (let i in data) {
            createAt = prHlp.get_def_date(data[i].created);
        }
        res.send({
            status: 200,
            data: arr
        })
    }
};