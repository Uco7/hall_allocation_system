const getRoute=require("express").Router();
const pageCont=require("../services/page")
const { verifyUserToken,verifyAdminToken}=require("../helperMildware/jwtToken")
getRoute.get("/",pageCont.home)
getRoute.get("/login",pageCont.login)
getRoute.get("/register/user",pageCont.userRegister)
getRoute.get("/register/admin",pageCont.adminRegiser)
getRoute.get("/check/hall",pageCont.CheckHall)
getRoute.get("/check/hall/page",pageCont.CheckHallPage)
getRoute.get("/allocate/hall/page",pageCont.allocateHallPage)
getRoute.get("/admin/dashbord",pageCont.adminDashBord)
// getRoute.get("/user/dashbord",verifyUserToken, pageCont.userDashBord)
module.exports=getRoute   