const User=require("../model/userModel"); //requesting or requiring the user model
const Admin=require("../model/adminModel") //requesting or requiring the admin model
const Hall=require("../model/hallModel")
const AllocatedHall=require("../model/allocatedHall")

const {genAdmintoken,genUserToken}=require("../helperMildware/jwtToken");//requesting or requiring the jwt mildware to authenticate actors

require("dotenv").config //requesting or requiri

module.exports={
    // function to register admin
   
   
        // Function to register admin
        register: async (req, res) => {
            try {
                const {
                    role,
                    name,
                    matno,
                    course,
                    email,
                    faculty,
                    department,
                    level,
                    address,
                    phone_no,
                    password
                } = req.body;
                
                console.log("Request Body:", req.body); // Log the entire request body
        
                // Validation regex patterns
              
                if (role === "admin") {
                    const nameRegex = /^[A-Za-z\s.'-]+$/;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^\+?\d{1,4}[-\s]?\d{1,15}$/;
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&<>^.,:;[\]{}()|~`#\-_/\\+=]{4,}$/;
            
                    // Common validation
                    if (!nameRegex.test(name)) throw new Error("Invalid name format");
                    if (!emailRegex.test(email)) throw new Error("Invalid email format");
                    if (!phoneRegex.test(phone_no)) throw new Error("Invalid phone number format");
                    if (!passwordRegex.test(password)) throw new Error("Invalid password format: password must contain a lower case letter,upper case and minimum of 8 length character");
            
                    console.log(`Role selected: ${role}`); // Log the selected role
                    console.log("Admin registration in progress"); // Log that admin registration is starting
            
                    // Specific validation for admins
                    const newAdmin = await Admin.create({
                        name,
                        email,
                        phone_no,
                        password,
                    });
        
                    if (newAdmin) {
                        console.log("Admin registered successfully", newAdmin);
                        return res.redirect("/login");
                    }

                } else  {
                    const nameRegex = /^[A-Za-z\s.'-]+$/;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^\+?\d{1,4}[-\s]?\d{1,15}$/;
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&<>^.,:;[\]{}()|~`#\-_/\\+=]{4,}$/;
            
                                        // Specific validation for students
                                         if (!nameRegex.test(name)) throw new Error("Invalid name format");
                    if (!emailRegex.test(email)) throw new Error("Invalid email format");
                    if (!phoneRegex.test(phone_no)) throw new Error("Invalid phone number format");
                    if (!passwordRegex.test(password)) throw new Error("Invalid password format: password must contain a lower case letter,upper case and minimum of 8 length character");
            
                                        // Create new student user
                                        const newUser = await User.create({
                                            name,
                                            matno,
                                            course,
                                            email,
                                            faculty,
                                            department,
                                            level,
                                            address,
                                            phone_no,
                                            password,
                                        });
                            
                                        if (newUser) {
                                            console.log("User registered successfully", newUser);
                                            return res.redirect("/login");
                                        }
                    
                } 
                }catch (error) {
                console.error("Error during registration:", error);
                res.status(500).json({
                    message: error.message || "Internal server error"
                });
            }        
        },   
        
// function to register users  on system
     
        
    
        // login functionality to  log or sign in different actors of the system
        login: async (req, res) => {
            try {
                const { email, password, role } = req.body;
                console.log("req body", req.body);
        
                // Regex patterns for validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&<>^.,:;[\]{}()|~`#\-_/\\+=]{8,}$/;
        
                // Validate email and password format
                if (!emailRegex.test(email)) throw new Error("Invalid email format");
                if (!passwordRegex.test(password)) throw new Error("Invalid password format");
        
                // Handle Admin Login
                if (role === "admin") {
                    console.log("role",role)
                    const loginAdmin = await Admin.login(email, password);
                    if (!loginAdmin) {
                        return res.status(400).json({ error: 'Invalid email or password' });
                    }
        
                    // Generate token and set session
                    const token = genAdmintoken(loginAdmin._id);
                    req.session.token = token;
                    req.session.adminId = loginAdmin._id;
        
                    return res.redirect('/admin/dashBord');
        
                // Handle User Login
                } else if (role === "student") {
                    const loginUser = await User.login(email, password);
                    if (!loginUser) {
                        return res.status(400).json({ error: 'Invalid email or password' });
                    }
        
                    // Generate token and set session
                    const token = genUserToken(loginUser._id);
                    req.session.token = token;
                    req.session.loginUserId = loginUser._id;
        
                    return res.redirect('/check/hall');
        
                } else {
                    return res.status(400).json({ error: 'Invalid role' });
                }
            } catch (error) {
                console.error("Error in login handler:", error.message);  // Log the exact error
                res.status(500).json({ message: error.message });
            }
        },
        addHall: async (req, res) => {
            try {
                const { hallName, hallCapacity } = req.body;
            
                // Create a new Hall document
                const newHall = new Hall({
                    hallName,
                    capacity: hallCapacity, // Make sure this matches the model field
                });
        
                await newHall.save();
               
                console.log("hall added ",newHall)
                res.status(201).send({ message: 'Hall added successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error adding hall', error: error.message });
            }
        },
        FindHall:async(req,res)=>{
            try {
                if(req.query.id){
                    const hallId=req.query.id;
                    const singlehall=await Hall.findById(hallId);
                    if(singlehall){
                        console.log("single hall",singlehall);
                        res.status(200).json({
                            status:"success",
                            singlehall
                        })
                    }else{
                        console.log("no hall foundd with the id")
                    }
                }else{
                    const hall =await Hall.find()
                    if(hall){
                        console.log("all hall",hall)
                        res.status(200).json({
                            status:"success",
                            hall
                        })
                    }
                }
                
            } catch (error) {
                console.log("error",error) 
                res.status(500).send("internal server error",error)
                
            }

        },
        allocateHall: async (req, res) => {
            try {
                const { hallId, department, students,courseCode,level } = req.body;
                console.log("allocated hall",req.body)
    
                // Check if hall exists
                const hall = await Hall.findById(hallId);
                if (!hall) {
                    return res.status(404).json({ message: "Hall not found" });
                }
    
                // Create allocation record
                const newAllocation = new AllocatedHall({
                    hall: hall._id,
                    department,
                    students,
                    courseCode,
                    level
                });
    
                await newAllocation.save();
    
                console.log("Hall allocated successfully", newAllocation);
                res.status(201).json({ message: "Hall allocated successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        },
        findAllocatedHall: async (req, res) => {
            try {
                let { courseCode } = req.body; // Change 'const' to 'let'
                
                courseCode = courseCode.replace(/\s+/g, "").toUpperCase(); // Remove whitespace and set to uppercase
                console.log("Processed courseCode:", courseCode);
                
                // Find allocations by courseCode and populate hall details
                const allocations = await AllocatedHall.findOne({ courseCode }).populate("hall");
                console.log("Allocation found:", allocations);
                
                if (!allocations) {
                    return res.status(404).json({ message: "No allocations found for the specified course and department" });
                }
                
                // Render the EJS template with the allocations data
                res.render("CheckHallPage", { allocations });
            } catch (error) {
                console.log("Error:", error);
                res.status(500).json({ message: "Error retrieving allocations", error: error.message });
            }
        }
        
        


    
      }
      
          
          
    

