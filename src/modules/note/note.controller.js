import note from '../../../databases/models/noteModule.js'
import {Op} from 'sequelize'
import user from '../../../databases/models/userModel.js';
// 1- add note
export const addNote = async (req, res, next) => { 
    //get data from request
    const { title, content , userId} = req.body;
    //check user id exist
    const result = await note.findOne({ where: { userId } });
    if (!result) {
        res.json({message: "Invalid Id"});
    } else {
        //add note
        await note.create({ title, content ,userId});
        res.json({message: "Create Successfully"});
    }
};
// 2- delete note (note creator only )
export const deleteNote = async (req, res, next) => {
    const {id,userId} =req.query;
    const noteExist = await note.findOne({ where: {id} })
    const result = await note.findOne({
        where:{ [Op.and]:[ {id}, {userId} ] }
    });
    if(!noteExist) res.json({message:"Note Not Found"});
    else if(!result) res.json({message:"You can't delete this note"});
    else{
        await note.destroy({ where: {id} });
        res.json({message:"Deleted Successfully"});
    }
};
// 3- update note (note owner only)
export const updateNote = async(req, res, next) => {
    const {id,userId} = req.query;
    const {title,content} = req.body;
    //check note exist
    const noteExist = await note.findOne({ where:{id} });
    //check user owner
    const result = await note.findOne({ where:{ [Op.and]:[ {id}, {userId} ] } });
    if(!noteExist) {
        res.json({message:"Note Not Found"});
    }else if(!result) {
        res.json({message:"You can't update this note"})
    }else{
        //update note
        await note.update({title,content},{ where:{id} })
        res.json({message:"Update Successfully"});
    }
};
// 4- get all notes
export const getAllNotes = async (req,res,next) => {
    const notes = await note.findAll()
    res.json({notes})
};
// 5- get all notes with their owners information (using include)
export const getAllByUser = async(req, res, next) => {  
    const notes = await note.findAll({
        include: [{ model: user, attributes: ['name', 'email'] }]
    });
    res.json({notes}); 
}