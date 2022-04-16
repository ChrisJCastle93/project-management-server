const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')


const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = model('Project', projectSchema)