const auth_model = require('./../model/adminAuth');
const ck = (req) => {
    return new Promise(async (resolve, reject) => {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let agent = req.get('User-Agent');
        let uuid = req.cookies.uuid_auth;
        ip=ip.split(":")[0]
        if (!ip || !uuid || !agent) return reject(false);
        let d = await auth_model.findOne({ip, agent, uuid}).exec();
        if (!d) return reject(false);
        resolve(d.username);
    });
};
module.exports = ck;
