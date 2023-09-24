const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const Project = require('./projects')
const csvtojson = require('csvtojson')

const cors = require('cors')
const app = express()

mongoose.connect('mongodb+srv://rakshitnautiyal18198:v1emzEvH4sWU4Fyx@cluster0.kpkaedu.mongodb.net/').then(() => {     // MongoDB connection
    console.log('database connected')
});


app.use(express.static('public'))    // static folder
app.set('view engine', 'ejs')             // set the template engine

app.listen(4000, () => {
    console.log('server started at port 4000')
})

var excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/excelUploads');      // file added to the public folder of the root directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var excelUploads = multer({ storage: excelStorage });
app.use(cors())
app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.get('/projects' , async (req, res)=> {
    const totalProjects=await Project.find ({}).exec();
    console.log(totalProjects)
    res.send(totalProjects);
} )
app.use(express.json()); // Middleware to parse JSON request body

// Define a POST route for searching projects
app.post('/searchProjects', async (req, res) => {
    try {
        // Extract search criteria from the request body
        const { title, technologies, frontend, backend, databases, infrastructure } = req.body;

        // Create an empty query object to build the search criteria dynamically
        const query = {};

        // Add search criteria based on the provided fields
        if (title) {
            query['Project.Title'] = title;
        }
        if (technologies) {
            query['Project.Technologies'] = technologies;
        }
        if (frontend) {
            query['Technical_Skillset.Frontend'] = frontend;
        }
        if (backend) {
            query['Technical Skillset Backend'] = backend;
        }
        if (databases) {
            query['Technical_skillset.Database'] = databases;
        }
        if (infrastructure) {
            query['Technical_skillset.Infrastructure'] = infrastructure;
        }

        // Use the find method of the Project model to search for projects
        const matchingProjects = await Project.find(query).exec();

        // Return the matching projects as a response
        res.json(matchingProjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// upload excel file and import in mongodb
app.post('/uploadExcelFile', excelUploads.single("uploadfile"), (req, res) => {
    importFile('./public' + '/excelUploads/' + req.file.filename);
    function importFile(filePath) {
        //  Read Excel File to Json Datare
        var arrayToInsert = [];
        csvtojson().fromFile(filePath).then(source => {
            // Fetching the all data from each row
            for (var i = 0; i < source.length; i++) {
                console.log(source[i])
                var singleRow = {
                    "Project.Title": source[i].Project.Title,
                    "Project.Technologies": source[i].Project.Technologies,
                    "Technical_Skillset.Frontend": source[i].Technical_Skillset.Frontend,
                    "Technical Skillset Backend": source[i].Technical_Skillset.Backend,
                    "Technical_skillset.Database": source[i].Technical_Skillset.Databases,
                    "Technical_skillset.Infrastructure": source[i].Technical_Skillset.Infrastructure,
                };
                arrayToInsert.push(singleRow);
            }
            //inserting into the table student
            Project.insertMany(arrayToInsert)
                .then(result => {
                    console.log("File imported successfully.");
                    res.redirect('/');
                })
                .catch(err => {
                    console.error(err);
                    // Handle the error here
                });

        });
    }
})