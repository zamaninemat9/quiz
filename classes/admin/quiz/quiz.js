const quizModel = require('./../../../model/admin/quiz');
module.exports = new class login {
    index(req, res) {
        res.render('admin/quiz/index')
    }

    async insert(req, res) {
        let {title,expireDate,startDate,description,catId} = req.body;
        let body = {
            title: req.body.title,
            expireDate: req.body.expireDate,
            startDate: req.body.startDate,
            description: req.body.description,
            catId: req.body.catId,
            created: new Date()
        }
        await quizModel.create(body,(e) => {
            if (e) {
                return res.send({
                    status: 500,
                    description: err['500']
                })
            }
            return res.send({
                status:200,
                description:err['200']
            })
        }).exec();
        res.send({
            status:200,
            description:err['200']
        })
    }
};