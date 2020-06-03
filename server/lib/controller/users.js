const Users     = require("../model/users");

class UserData {
    saveUser = async (req, callback) => {

        const req_body  = req.body || {};

        if(Object.keys(req_body).length === 0)
            return callback("Empty request data");

        const {username, email_id, address_line_1, address_line_2, phone_number} = req_body;

        if(!username)
            return callback("Empty username");
    
        if(!email_id)
            return callback("Empty to email id");
        
        if(!address_line_1)
            return callback("Empty address line 1");

        if(!address_line_2)
            return callback("Empty address line 2");

        if(!phone_number)
            return callback("Empty phone number");
    
        try {
            const new_user = Users({
                username,
                email_id,
                address_line_1,
                address_line_2,
                phone_number
            });    
            await new_user.save();
            callback(null, "User added successfully");
        } catch (error) {
            callback(error);
        }
    }

    getUsers = async (req, callback) => {
        try {
            const user_data = await Users.find({});
            callback(null, user_data);
        } catch (error) {
            callback(error);
        }
    }
}
module.exports = new UserData;