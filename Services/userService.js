const { response } = require("express");
const Users = require("../models/models");
const bcrypt = require('bcrypt');

const userService = {

    postUserService: async(requestBody, cb) =>{
        const { first_name, last_name, email_id, phone_number, password } = requestBody;

        const salt= await bcrypt.genSalt(10);
        const encryptedPwd = await bcrypt.hash(password, salt);
        const user = new Users({ first_name,
             last_name,
             email_id,
             phone_number,
             password : encryptedPwd });
        user
        .save()
        .then((response) => {
            console.log(response);
            cb(null, response);
        })
        .catch((err) =>
        {
            console.log("Data failed: ", err);
            cb(err, null);
        });
    },
    getUserService: (cb) =>{
        Users.find({}, (err, response) => {
            if(err)
            {
                cb(err, null);
                return;
            }
            else {
                cb(null, response);
            }
        }
        )
    },
    updateUserById: (id, name, cb) => {
        Users.findByIdAndUpdate(
            { _id: id },
            { name: name },
            { new: true },
            (err, response) => {
                if(err)
            {
                cb(err, null);
                return;
            }
            else {
                cb(null, response);
            }
            }
        );
    },
    deleteUserById: (id, cb) =>{
        Users.deleteOne(
            { _id: id},
            (err, response) => {
                if(err)
            {
                cb(err, null);
                return;
            }
            else {
                cb(null, response);
            }
            }
        );
    },
    authenticateUserService: (email, password, cb) =>
    {
        Users.findOne({email_id:email}, async(err, response) =>
        {
            if(err)
            {
                cb(err, null);
                return;
            }
            else
            {
                const result = await bcrypt.compare(password, response.password);
                console.log("Name: ",response.first_name);
                if(result)
                {
                    cb(null, response);
                }
                else{
                    cb({status: 400, message:"user entered wrong password"}, response);
                }
            }
        });
    },
};

module.exports = userService;