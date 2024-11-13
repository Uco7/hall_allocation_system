module.exports={
    home:(req,res)=>{
        res.render("index")
    },
    login:(req,res)=>{
        res.render("login")
    },
    userRegister:(req,res)=>{
        res.render("registerUser")
    },
    adminRegiser:(req,res)=>{
        res.render("adminRegister")
    },
    CheckHall:async(req,res)=>{
        res.render("ckeckHall")
    },
    CheckHallPage:async(req,res)=>{
        res.render("CheckHallPage")
    },
    allocateHallPage:async(req,res)=>{
        try {
            const hallId=req.query.id
            const response = await fetch(`http://localhost:3000/find/hall?id=${hallId}`);
            
            if (!response.ok) {
                return res.status(404).json({
                    status: "no valid data"
                });
            }
    
            const data = await response.json();
            console.log("data from findin one  hall by id", data);
            
            // Pass `data` to `adminDashbord` view
            res.render("allocateHall",{data})
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({
                status: "Server error",
                message: "Could not fetch data"
            });
        }
        
        
    },
    adminDashBord:async(req,res)=>{
        try {
            const response = await fetch("http://localhost:3000/find/hall");
            
            if (!response.ok) {
                return res.status(404).json({
                    status: "no valid data"
                });
            }
    
            const data = await response.json();
            console.log("data from reg hall", data);
            
            // Pass `data` to `adminDashbord` view
            res.render("adminDashbord", { data });
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({
                status: "Server error",
                message: "Could not fetch data"
            });
        }
}
}