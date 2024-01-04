import user from "../../../databases/models/userModel.js";
import {Op} from "sequelize" ;
// 1- sign up
export const signUp = async (req,res,next) => { 
    // get data from request
    const { name, email, password, age } = req.body;
    // check email exist
    const result = await user.findOne({ where: { email } });
    if (result) {
        res.json({message:"Email Already Exist"});
    } else {
        // add user
        await user.create({name, email, password, age});
        res.json({message:"SignUp Successfully"});
    }
};
// 2- sign in 
export const signIn = async (req,res,next) => {
    // get data from request
    const { email, password} = req.body
    // check user exist
    const result = await user.findOne({
        where: {[Op.and]: [ {email}, {password} ]}
    });
    if (result) { 
        res.json({message:"LogIn Successfully"});
    }else {
        res.json({message:"Email or Password Not Correct"});
    }
};
// 3- update user 
export const updateUser = async(req,res,next) => {
    const {id} =req.query;
    const { name, email, password, age } = req.body
    // check user exist
    const result = await user.findOne({ where:{id} });
    // check email exist
    const emailExist = await user.findOne({ where:{email} });
    if(!result) res.json({message:"User Not Found"});
    else if(emailExist) res.json({message:"Email Already Exist"})
    else{
        await user.update({ name, email, password, age },{
            where: {id} });
            res.json({message:"Updated Successfully"});
    }
};
// 4- delete user
export const deleteUser = async(req,res,next) => {
    // get user id from query
    const { id } = req.query;
    //check user exist
    const result = await user.findOne({ where: { id } });
    if(result){
        // delete user
        await user.destroy({ where: { id } });
        res.json({message:"Deleted Successfully"})
    }else{
        res.json({message:"User Not Found"})
    }
};
// 5- search for user where his name start with "a" and age less than 30 => using like for characters
export const searchByName = async (req, res, next) => {
    const {word, age} =req.query;
    const users = await user.findAll({
        where: {
            name: { [Op.like]: `${word}%` }, 
            age: { [Op.lt]: age } } 
        }); 
    res.json({users})
};
// 6- search for user where his age is between 20 and 30 
export const searchByAge = async(req,res,next) => {
    const {less,more} = req.query
    const users = await user.findAll({
        where: { age: { [Op.between]: [less, more] } }
    });
    res.json({users})
};
// 7- get the users oldest 3 in Age
export const oldUsers = async (req,res,next) => {
    const users = await user.findAll({
        order: [['age', 'DESC']],
        limit: 3
    });
    res.json({users})
};
// 8- search for users by list of ids => using IN
export const searchById = async(req,res,next) => {
    const {id} = req.query
    const users = await user.findAll({
        where: { id: { [Op.in]: id } }
    });
    res.json(users)
};
// 9- get all user 
export const allUsers = async (req, res, next) => {
    const result = await user.findAll()
    res.json(result)
};