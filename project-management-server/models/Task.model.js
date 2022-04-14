const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')


const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}]
})

module.exports = model('Task', taskSchema)