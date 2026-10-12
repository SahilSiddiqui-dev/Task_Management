const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require : [true, "Task is required"],
        trim : true,
    }
},
    {timeseries : true}

)

module.exports = mongoose.model('Tasks', taskSchema);