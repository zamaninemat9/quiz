const adminUsersModel = require('./../../model/adminUsers');
const adminAuthModel = require('./../../model/adminAuth');
const encHlp=require('./../../helpers/encrypt_helper');
const rndHlp=require('./../../helpers/rand_helper');
module.exports = new class login {
    renderPage(req, res) { // GET
        res.render('admin/login')
    }
    async checkLogin(req, res) { // POST
        let {username,password} =req.body;
        let checkAdmin = await adminUsersModel.findOne({username}).exec();
        if (!checkAdmin) return res.send({
            status:402,
            description:err['4021']
        });
        let chckPass=await encHlp.check({
            password,
            salt:checkAdmin.salt,
            hash:checkAdmin.hash
        });
        if(!chckPass) return res.send({
            status:402,
            description:err['4021']
        });
        let uuid = rndHlp.uid('5');
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.split(":")[0];
        await adminAuthModel.findOneAndUpdate({username}, {
            uuid,
            ttl: new Date(new Date().getTime() + 60000 * 60),
            ip,
            agent: req.get('User-Agent'),
        }, {upsert: true}).exec();
        res.cookie('uuid_auth', uuid, {expire: new Date().getTime() + 60 * 60 * 1000});
        res.send({
            status:200,
            description:err['200']
        })
    }
};