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
        let quiz = await quizModel.findOne({_id: req.params.id}).exec();
        if (!quiz) return res.send({
            status: 402,
            description: err['4022']
        });

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