const postRoute=require("express").Router()
const authcont=require("../controller/authCont")

postRoute.post("/register",authcont.register)
postRoute.post("/login",authcont.login)
postRoute.get("/find/hall",authcont.FindHall)
postRoute.post("/register/hall",authcont.addHall)
postRoute.post("/check/hall",authcont.findAllocatedHall)
postRoute.post("/allocate/hall",authcont.allocateHall)
module.exports=postRoute