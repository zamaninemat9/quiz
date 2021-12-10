const adminUsersModel=require('./../model/adminUsers');
const adminAuthModel=require('./../model/adminAuth');
module.exports=new class login{
  renderPage(req,res){ // GET
      res.render('admin/login')
  }
 async checkLogin(req,res){ // POST
     let checkAdmin=await adminUsersModel.findOne({username:req.body.username}).exec();

  }
};