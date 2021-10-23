const { response } = require("express");
const userService = require("../Services/userService");
const jwt = require("jsonwebtoken");

const userController = {
    postUsers: (req, res) => {
        console.log(req.body);
        const {
            email_id,
            first_name,
            last_name,
            phone_number,
            password,
          } = req.body;
        if(!email_id)
        {
            res.status(400).json({
                status: 400,
                message: "email not defined",
            });
        } else if(!(first_name && last_name))
        {
            res.status(400).json({
                status: 400,
                message: "name not defined",
            });
        }  else if(!phone_number)
        {
            res.status(400).json({
                status: 400,
                message: "Phone number not defined",
            });
        }
        else if(!password)
        {
            res.status(400).json({
                status: 400,
                message: "Password not defined",
            });
        }
        userService.postUserService(req.body, (err, response)=>{
            if(err){
                res.status(500).json({
                message: "Something went wrong"
                });
            } else{
                res.status(200).json({
                    message: "User created"
                    });
            }
        })
    },
    getUsers: (req, res) => {
        userService.getUserService((err, response) =>
        {
            if(err){
                res.status(500).json({
                message: "Something went wrong"
                });
            } else{
                res.status(200).json({
                    message: response//"Something went wrong"
                    });
            }
        });
    },
    updateUserById:(req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        userService.updateUserById(id, name, (err, response) =>
        {
            if(err){
                res.status(500).json({
                message: "Something went wrong"
                });
            } else{
                res.status(200).json({
                    message: response//"Something went wrong"
                    });
            }
        })
    },
    deleteUserById: (req, res) => {
        const {id} = req.params;
        userService.deleteUserById(id,(err, response) =>
        {
            if(err){
                res.status(500).json({
                message: "Something went wrong"
                });
            } else{
                res.status(200).json({
                    message: "user deleted"//"Something went wrong"
                    });
            }
        });
    },
    authenticateUser: (req,res) => {
        const { email_id , password } = req.body;
        userService.authenticateUserService(email_id, password, (err, response) =>
        {
            //console.log("3");
            if(err){
                res.status(err.status).json(err.message);
            } else{
                const authToken = jwt.sign({id: response._id}, process.env.secret, 
                    {
                        expiresIn: "20 days",
                    });
                    console.log("authToken: ",authToken);
                res.status(200).json({
                    message: "Logged in.",
                    token: authToken,
                    name: response.first_name//"Something went wrong"
                    });
                //res.redirect("http://localhost:3000/");
            }
        });
    }
};

module.exports = userController;