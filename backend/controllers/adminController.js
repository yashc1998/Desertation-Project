const Admin = require('../models/administratorModel')

const loginAdmin = async (req, res) => {
    const {email, password} = req.body;
    console.log("EMAIL & PASSWORD", req.body)
    try {
        const admin = await Admin.find({email: email, password: password})
        console.log("ADMIN: ", admin)
        if(admin){
            return res.status(200).json(admin)
        }else{
            return res.status(404).json({error: [{msg: "Invalid Credentials"}]})
        }
    } catch (error) {
        return res.status(500).json({error: [{msg: "Internal Server Error!!"}]})
    }
}

module.exports = {loginAdmin}