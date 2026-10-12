const Tasks = require('../models/taskSchema');
const isValid = require('../utils/isValid');
const asyncHandler = require('../utils/asyncHandler');

exports.createTask = asyncHandler(async(req, res) => {
    const {title} = req.body;

    if(!isValid(title)) {
        return res.status(400).json({
            success : false,
            message : "Please provide a valid task"
        })
    }

    const taskExists = await Tasks.findOne({
        title : title
    })

    if(taskExists) {
        return res.status(409).json({
            success : false,
            message : "Task already Exists",
        })
    }

    const newtask = await Tasks.create({title});

    res.status(201).json({
        success : true,
        message : "New Task is Created",
        data : newtask
    })

}) 

exports.getTask = asyncHandler(async(req, res) => {
    const alltasks = await Tasks.find().sort({createdAt : -1});
    res.status(200).json({
        success : true,
        count : alltasks.length,
        data : alltasks
    })
})

exports.deleteTask = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const taskExists = await Tasks.findByIdAndDelete(id)

    if(!taskExists) {
        return res.status(404).json({
            success : false,
            message : "Task does not exists"
        })
    
    }

    res.status(200).json({
        success : true,
        message : "task deleted successfully"
    })

    
})