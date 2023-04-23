const {Router}=require("express")
const router = Router()
const {getData,saveData,deleteData,aggrigate}=require("../controllers/DataController")

router.get("/",getData)
.post("/",saveData)
.delete("/:id",deleteData)
.post("/getData",getData)
.post("/agg",aggrigate)


module.exports=router