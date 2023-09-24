const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
        "Project.Title" : {type : String },
        "Project.Technologies" : {type: String },
        "Technical_skillset.Frontend" : {type: String },
        "Technical_Skillset.Backend" : {type: String },
        "Technical_skillset.Database" : {type: String },
        "Technical_skillset.Infrastructure" : {type: String }
})

module.exports = mongoose.model('Project', projectSchema)