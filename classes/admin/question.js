const questionModel = require('./../../model/admin/questions');
const quizModel = require('./../../model/admin/quiz');
const prHlp = require('./../../helpers/persian_date_helper');

module.exports = new class Question {
    async render(req, res) { //render index page for questions Data
        let quiz = await quizModel.findOne({_id: req.params.id}).exec();
        if (!quiz) return res.send({
            status: 402,
            description: err['4022']
        });
        let data = await questionModel.find({quizId: req.params.id}).exec();
        let arr = [];
        for (let i in data) {
            arr.push({
                question: data[i].question,
                answerCount: data[i].answerCount,
                type: getQuestionType(data[i].type),
                answer: type === 1 ? data[i].answer : null,
                created: prHlp.get_def_date(data[i].created)
            })
        }
        res.send({
            status: 200,
            data: arr
        })
    }

    async insert(req, res) {
        let {question, type} = req.body;
        let quiz = await quizModel.findOne({_id: req.params.id}).exec();
        if (!quiz) return res.send({
            status: 402,
            description: err['4022']
        });
        let obj = {
            quizId: req.params.id,
            question,
            type,
            created: new Date()
        }
        if (type === 1) {
            obj.answerCount = req.body.answerCount;
            obj.answer = {
                answer1: req.body.answer.answer1,
                answer2: req.body.answer.answer2,
                answer3: req.body.answer.answer3,
                answer4: req.body.answer.answer4,
                trueAnswer: req.body.answer.trueAnswer,
            }
        }
        questionModel.create(obj, (e, d) => {
            if (e) return res.send({
                status: 500,
                description: err['500']
            })
            res.send({
                status: 200,
                description: err['200']
            })
        })
    }

    async remove(req, res) {
        await questionModel.findByIdAndDelete({_id: req.params.id}, (e) => {
            if (e) return res.send({
                status: 500,
                description: err['500']
            })
            res.send({
                status: 200,
                description: err['200']
            })
        })
    }

    async getSingle(req, res) {
        await questionModel.findOne({_id: req.params.id}, (e, d) => {
            if (e) return res.send({
                status: 500,
                description: err['500']
            })
            res.send({
                status: 200,
                data: d
            })
        })
    }

    async update(req, res) {
        let check = await questionModel.findOne({_id: req.params.id}).exec();
        if (!check) return res.send({
            status: 402,
            description: err['4022']
        })
        let {title,question,type}=req.body;
        let obj={
            title,
            question,
            type,
            updated: new Date()
        }
        if (type === 1) {
            obj.answerCount = req.body.answerCount;
            obj.answer = {
                answer1: req.body.answer.answer1,
                answer2: req.body.answer.answer2,
                answer3: req.body.answer.answer3,
                answer4: req.body.answer.answer4,
                trueAnswer: req.body.answer.trueAnswer,
            }
        }
        await questionModel.findOneAndUpdate({_id: req.params.id}, obj).exec()
        res.send({
            status:200,description:err['200']
        })
    }
};

function getQuestionType(ty) {
    switch (ty) {
        case 1:
            return 'چهار گزینه ای';
            break;
        case 2:
            return 'تشریحی';
            break;
        case 2:
            return 'بارگزاری فایل';
            break;
    }
}