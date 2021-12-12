const usersModel = require('./../../model/users/users');
const usersAuthModel = require('./../../model/users/usersAuth');
const rndHlp = require('./../../helpers/rand_helper');

module.exports = new class login {
    render(req, res) {
        res.render('')
    }

    async set(req, res) {
        let {nationalCode, mobile, quiz} = req.body;
        let hsWithNational = await usersAuthModel.findOne({nationalCode, quiz}).exec();
        if (hsWithNational) return res.send({
            status: 403,
            description: err['4031'],
            data: quiz
        });
        let userData = await usersModel.findOne({nationalCode}).exec();
        let obj = {
            countOfQuiz: 1,
            created: new Date(),
            lastQuizTime: new Date(),
            mobile
        };
        if (userData) {
            obj.countOfQuiz = userData.countOfQuiz;
            delete obj.created;
        }
        await usersModel.findOneAndUpdate({nationalCode}, obj, {upsert: true}).exec();
        let uuid = rndHlp.uid('5');
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.split(":")[0];
        await usersAuthModel.findOneAndUpdate({nationalCode}, {
            uuid,
            ttl: new Date(new Date().getTime() + 60000 * 60),
            ip,
            agent: req.get('User-Agent'),
            quiz,
        }, {upsert: true}).exec();
        res.cookie('uuid_quiz', uuid, {expire: new Date().getTime() + 60 * 60 * 1000});
        res.send({
            status: 200,
            description: err['200'],
            data: {
                quiz
            }
        })
    }
};
