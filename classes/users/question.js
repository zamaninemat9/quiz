const quizModel = require('./../../model/admin/quiz');
const questionModel = require('./../../model/admin/questions');
module.exports = class Question {
    async setQuestionAnswer(req, res) {
        let {quizId, questionId} = req.body;
        let checkQuiz = await quizModel.findOne({_id: quizId}).exec();
        if (!checkQuiz) return res.send({
            status: 402,
            description: err['4022']
        })
        if (new Date(checkQuiz.expireDate) < new Date() || new Date(checkQuiz.startDate) > new Date()) return res.send({
            status: 402,
            description: err['4026']
        })
    }
}