const express = require('express');
const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
const app = express();
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { spawn } = require('child_process');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

// const {client} = new Client();
const port = process.env.PORT || 8005;
const https = require('https');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
global.window = dom.window;
global.document = dom.window.document;

const ejs = require('ejs');
// const User = require('./models/user');

const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'public/Images' });
// var upload = multer({limits: {fileSize: 1064960 },dest:'/uploads/'}).single('picture');


// const Grid = require('gridfs-stream');




const base64Img = require('base64-img');




app.use(express.static(path.join(__dirname, '')));
app.set('view engine', 'ejs');
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const csp = require('content-security-policy');

 
const cspPolicy = {
  'report-uri': '/reporting',
  'default-src': csp.SRC_NONE,
  'script-src': [ csp.SRC_SELF, csp.SRC_DATA ]
};
 
const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);
const localCSP = csp.getCSP(cspPolicy);
 
// const RedisStore = require('connect-redis')(session);

// This will apply this policy to all requests if no local policy is set
app.use(globalCSP);
 
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", `https://${process.env.PORT}-zakhoudache-jisrpharmac-q94cj5igwn9.ws-eu88.gitpod.io`);
  res.header("Access-Control-Allow-Origin", "https://${process.env.PORT}-test-jisr-production.up.railway.app/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('trust proxy', 1);

// app.use(session({
// cookie:{
//     secure: true,
//     maxAge:60000
//        },
// store: new RedisStore(),
// secret: 'secret',
// saveUninitialized: true,
// resave: false
// }));

// app.use(function(req,res,next){
// if(!req.session){
//     return next(new Error('Oh no')) //handle error
// }
// next() //otherwise continue
// });

// const crypto = require('crypto');

// // Generate a random 16-byte nonce value
// const nonce = crypto.randomBytes(16).toString('base64');

// Set the Content Security Policy header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "style-src 'self' 'unsafe-inline'");

  next();
});

// Render the HTML file with the nonce value in the style tag
app.get('/', (req, res) => {
  res.setHeader('Content-Security-Policy', "style-src 'self' 'unsafe-inline'");

  res.sendFile('D:\\Jisr pharma\\page1.html')
  // const html = `
  //   <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <meta charset="utf-8">
  //       <title>Example Page</title>
  //       #inline-style {
  //         background: red;
  //       }
        
  //     </head>
  //     <body>
  //       <h1>Hello, world!</h1>
  //     </body>
  //   </html>
  // `;
  // res.send(html);
});



app.listen(process.env.PORT||8005,() => {
  console.log(`Server running at http://localhost:${8005}`);
});





const $ = require('jquery');

app.get('/pharma', function(req, res) {
  // res.setHeader("content_security_policy", `Content-Security-Policy: style-src 'unsafe-inline';`);
  res.sendFile('test-jisr/page1.html')
});


function loadTextFile(callback) {
  // Make the first GET request
  fs.readFile('ListFilename.txt', 'utf8', (err, data1) => {
    if (err) {
      console.error(`Error reading ListFilename.txt: ${err}`);
      return callback(err);
    }

    fs.readFile('ListFilenameOrdonnance.txt', 'utf8', (err, data2) => {
      if (err) {
        console.error(`Error reading ListFilenameOrdonnance.txt: ${err}`);
        return callback(err);
      }

      let $table = $("<table></table>");
      let lastLineC = data1.trim().split("\n");
      let lastLineO = data2.trim().split("\n");

      for (let i = 0; i < lastLineC.length; i++) {
        const filenameC = lastLineC[i].trim();
        const filenameO = lastLineO[i].trim();

        let $tableRow = $("<tr></tr>");
        let $textCell = $("<td></td>").text(filenameC + filenameO);
        let linkUrlC = `/src/Site1/Accueil.html?linkUrlC=${filenameC}`;
        let $linkCellChifa = $("<td></td>").html(`<a href="${linkUrlC}">Go to Page Accueil-C.html</a>`);
        let linkUrlO = `/src/Site1/Accueil.html?linkUrlO=${filenameO}`;
        let $linkCellOrdonnance = $("<td></td>").html(`<a href="${linkUrlO}">Go to Page Accueil-O.html</a>`);
        let linkUrl_C_O = `/src/Site1/Accueil.html?linkUrlC=${filenameC}&linkUrlO=${filenameO}`;
        let $linkCellChifa_Ord = $("<td></td>").html(`<a href="${linkUrl_C_O}">Go to Page Accueil-C-O.html</a>`);

        $tableRow.append($textCell, $linkCellChifa, $linkCellOrdonnance, $linkCellChifa_Ord);
        $table.append($tableRow);

        // Store the updated list of added filenames and image order in local storage
        let imageOrder = [];
        for (let i = 0; i < filenameC.length; i++) {
          imageOrder.push(filenameC[i]);
          imageOrder.push(filenameO[i]);
        }
      }
        
        $table.append("<thead><tr><th>Image Paths</th><th>Go Chifa</th><th>Go Ordonnance</th><th>Go Chifa-Ordonnance</th></tr></thead>");
        $table.append("<tbody></tbody>");
      
        html = `<html>
        <head>
        <style>
        #table-container {
          width: 100%;
          margin: 0 auto;
          padding: 20px;
          font-family: sans-serif;
        }
        
        table {
          border-collapse: collapse;
          width: 100%;
        }
        
        thead tr {
          background-color: #1abc9c;
          color: #fff;
          text-align: left;
        }
        
        th,
        td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        
        tbody tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        
        a {
          text-decoration: none;
          color: #1abc9c;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        </style>
      
          <title>List of filenames</title>
        </head>
        <body>
          ${$table.prop('outerHTML')}
        </body>
      </html>`;
       
        callback(null, html);

    
    // processData(data1, data2);
  });
});

}

function createTableRow(filenameC,filenameO) {
  // Implementation of createtablerow function goes here
  
    // Create the table row
    let $row = $("<tr></tr>");
  
    let $filenameCCell_OCell = $("<td></td>").text(filenameC+filenameO);
    $row.append($filenameCCell_OCell);
   
  
    // Add the links to the table
    let linkUrlC = `/src/Site1/Accueil.html?linkUrlC=\\${filenameC}`;
    let $linkC_Chifa = $("<td></td>").html(`<a href="${linkUrlC}">Go to Page Accueil-C.html</a>`);
    $row.append($linkC_Chifa);
  
    let linkUrlO = `/src/Site1/Accueil.html?linkUrlO=\\${filenameO}`;
    let $linkC_Ordonnance = $("<td></td>").html(`<a href="${linkUrlO}">Go to Page Accueil-O.html</a>`);
    $row.append($linkC_Ordonnance);
    // let linkUrl_C_O = `\\src\\Site1\\Accueil.html?linkUrlC=${imageOrder[i]}&linkUrlO=${imageOrder[i+1]}`;
  
    let linkUrl_C_O = `src/Site1/Accueil.html?linkUrlC=\\${filenameC}&linkUrlO=\\${filenameO}`;
    let $linkC_Chifa_Ord = $("<td></td>").html(`<a href="${linkUrl_C_O}">Go to Page Accueil-C-O.html</a>`);
    $row.append($linkC_Chifa_Ord);
    // Add the row to the table
    // $table.prepend($row);
      // }
  
    return $row;
  

  
}
app.get('/src/public/Images/:filename/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'src/public/Images/',filename, filename);
  res.sendFile(imagePath);
});
  const request = require('request');

  // Define the message parameters
  




//   const { MongoClient } = require('mongodb');
// // const {MongoClient}= require('mongodb');
// const mongoUri=`mongodb+srv://zhoudache:alcahyd2023@cluster0.ughawgz.mongodb.net/?retryWrites=true&w=majority`;

// MongoClient.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true }, (err, client)=> {
//   if (err) {
//       throw err;
//   }
//   console.log('connected to Mongodb')
// });


// const uri = mongoUri;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
// client.connect(err => {
//   console.log('Connected to MongoDB');
//   const collection = client.db("test");
//   // perform actions on the collection object
//   client.close();
// }
// );
// Connect to MongoDBconst
mongoose.connect(`mongodb://mongo:ppBUD8hmf6puVdcDX5FQ@containers-us-west-28.railway.app:5954`);
const db = mongoose.connection;
const { GridFSBucket } = require('mongodb');
  // Create a new GridFSBucket object
  const bucket = new GridFSBucket(db);
// const { MongoClient } = require('mongodb');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});



const userSchema = new mongoose.Schema({


  chifaImage: {
    firstName: { type: String, required: false},
    lastName: { type: String, required: false},
    name: { type: String, required: false },
    data: { type: Buffer, required: false },
    contentType: { type: String, required: false }
  },
  ordonnanceImage: {
    firstName: { type: String, required: false},
    lastName: { type: String, required: false},
    name: { type: String, required: false },
    data: { type: Buffer, required: false },
    contentType: { type: String, required: false }
  },
  chifa_ordonnanceImages:{
    coText:{type: [String], required: false} // updated to an array of strings
  },
  adresse: { 
    adresseText:{type: String, required: false }
  }
  
  
 
});

// Create a schema for the placeholder data
const placeholderSchema = new mongoose.Schema({
  orderNumber: String,
  isAccepted: Boolean,
  isRefused: Boolean,
  isOnMyWay: Boolean,
  isDone: Boolean,
  isNotStarted: Boolean
});


// Create a schema for the page state
const stateSchema = new mongoose.Schema({
  placeholderCount: Number,
  cardDisplay: String,
  checkboxContainerDisplay: String,
  acceptButtonDisplay: String,
  refuseButtonDisplay: String,
  onMyWayCheckboxChecked: Boolean,
  doneCheckboxChecked: Boolean,
  notStartedCheckboxChecked: Boolean,
  orderNumber: String
});

// Create a model for the page state
const State = mongoose.model('State', stateSchema);


// Create a model for the placeholder data
const Placeholder = mongoose.model("Placeholder", placeholderSchema);






const User = mongoose.model('User', userSchema);

    // Save image data to MongoDB
    const Image = mongoose.model('Image', new mongoose.Schema({
      name: String,
      image: {
        data: Buffer,
        contentType: String
      }
    }));



// Create a temporary object to store user data
let tempUser = {
  chifaImage: null,
  ordonnanceImage: null,
  chifa_ordonnanceImages:null,
  adresse: null
};
// Configure multer storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/Images/'); // set the destination folder for the uploaded file
//   },
//   filename: function (req, file, cb) {
//     // const extension = path.extname(file.originalname); // get the file extension
//     cb(null, file.fieldname + '-' + Date.now()); // set the filename
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/Images/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // create the directory if it doesn't exist
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // const extension = path.extname(file.originalname); // extract the file extension
    cb(null, file.fieldname + '-' + Date.now() + extension);
  }
});

// Create multer instance with storage engine
const downloadFile = (fileUrl, localPath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(localPath);

    https.get(fileUrl, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log('File downloaded successfully.');
          const fileData = fs.readFileSync(localPath);
          resolve(fileData);
        });
      });
    }).on('error', error => {
      fs.unlink(localPath, () => {
        reject(`Error downloading file: ${error.message}`);
      });
    });
  });
};
let sharedData=[];
// Endpoint for uploading Chifa image and name
app.post('/chifa', upload.single('image'), async (req, res, next) => {
  const fileUrl = req.body.imageChifa;
  const fileextension = fileUrl.split('/').pop();
  const filePart = fileextension.split('?')[0].split('.');
  const extension = filePart[filePart.length - 1];
  let localPath = `src/public/Images/${req.body.fileName}/Chifa@${req.body.fileName}.${extension}`;
  let counter = 0;
  while (fs.existsSync(localPath)) {
    counter += 1;
    localPath = path.join(
      __dirname,
      `src/public/Images/${req.body.fileName}/Chifa@${req.body.fileName}${counter}.${extension}`
    );
  }
  console.log(req.body.imageChifa, localPath); // log the uploaded file object

  const lastName = req.body.lastName;
  const imageName = `Chifa@${req.body.fileName}${counter}.${extension}`;
  const imagePath = path.join(__dirname, `src\\public\\Images\\${req.body.fileName}`, imageName);
  console.log(imagePath);

let imageNameChifa=imageName
  sharedData.imageNameChifa = imageNameChifa;
  
  // Wait for the file to download and get the buffer
  const buffer = await downloadFile(req.body.imageChifa, localPath);

  // Add chifaImage data to tempUser
  tempUser.chifaImage = {
    firstName: req.body.fileName,
    lastName: lastName,
    name: imageName,
    data: buffer,
    contentType: `image/${extension}`,
  };
  console.log('Chifa image uploaded successfully', tempUser.chifaImage);

  next();
});
// Endpoint for uploading Ordonnance image and name
app.post('/ordonnance', upload.single('image'), async (req, res) => {

     
  const fileUrl=req.body.imageOrdonnance;
  const fileextension =fileUrl.split('/').pop();
  const filePart = fileextension.split('?')[0].split('.');
  const extension = filePart[filePart.length - 1];
  let localPathO=`src/public/Images/${req.body.fileName}/Ordonnance@${req.body.fileName}.${extension}`;
  
  
let counter = 0;
while (fs.existsSync(localPathO)) {
  counter += 1;
  localPathO = path.join(__dirname, `src/public/Images/${req.body.fileName}/Ordonnance@${req.body.fileName}${counter}.${extension}`);
}
console.log(req.body.imageOrdonnance, localPathO, counter); // log the uploaded file object

// buffer=downloadFile(req.body.imageOrdonnance,localPath)
downloadFile(req.body.imageOrdonnance, localPathO).then(buffer => {
  tempUser.ordonnanceImage = {
    firstName: req.body.fileName,
    lastName: lastName,
    name: imageName,
    data: buffer,
    contentType: `image/${extension}`
  }; 
  console.log('Ordonnance image uploaded successfully', tempUser.ordonnanceImage);

}).catch(error => {
  console.error(`Error downloading file: ${error.message}`);
});

const lastName= req.body.lastName;
const imageName = `Ordonnance@${req.body.fileName}${counter}.${extension}`;
const imagePathO = path.join(__dirname, `src\\public\\Images\\${req.body.fileName}\\Ordonnance@${req.body.fileName}${counter}.${extension}`);
console.log(imagePathO);


const chifa_ordonnanceImages =[sharedData.imageNameChifa, imageName];

tempUser.chifa_ordonnanceImages = {

   coText : chifa_ordonnanceImages

}
console.log('Chifa and Ordonnance Both images sent together!',tempUser.chifa_ordonnanceImages);
res.send('Ordonnance image uploaded successfully and Chifa and Ordonnance Both images sent together!'); // rest of your code goes here
});



let globalAdr;


let sharedAdresse={}
// Endpoint for uploading adresse
app.post('/adresse', async (req, res, next) => {
  const adresse = req.body.Adr;
  sharedAdresse.adresse=req.body.Adr;
    
  // Add adresse data to tempUser
  tempUser.adresse = {
    adresseText: adresse
  };

  // res.send('Adresse saved successfully');

  // Create the user if all data has been submitted
  if (tempUser.chifaImage && tempUser.ordonnanceImage && tempUser.adresse && tempUser.chifa_ordonnanceImages.coText) {
    const user = new User(tempUser);
    console.log(user)
    await user.save();
    res.redirect('/livreurs.html');
    // Clear tempUser data
    // tempUser = {
    //   chifaImage: null,
    //   ordonnanceImage: null,
    //   adresse: null
    // };
  }
  next();
  console.log('User created:');
  // console.log(tempUser.chifaImage.data==tempUser.ordonnanceImage.data);
});

app.get("/adresses", async function(req, res) {
  try {
    const placeholders = await Placeholder.find({});
    res.send(placeholders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving placeholders from database");
  }
});


// });
app.get('/last-placeholder-id', async (req, res) => {
  try {
    const placeholder = await Placeholder.findOne({}, '_id', { sort: { _id: -1 } });
    res.json({ lastPlaceholderId: placeholder ? placeholder._id : null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// Route to retrieve all placeholders
app.get('/placeholders', async (req, res) => {
  try {
    const placeholders = await Placeholder.find({});
    res.json(placeholders);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});
// _id: ObjectId('6405c491811a53791e8d1121')

app.put("/placeholder/:id", function(req, res) {
  const id = req.params.id;
  const updateObject = req.body;

  Placeholder.findByIdAndUpdate(id, updateObject, function(err, placeholder) {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating placeholder in database");
    } else {
      console.log("Placeholder updated in database");
      res.status(200).send("Placeholder updated in database");
      console.log(res)
    }
  });
});




// Create a route that saves the state to MongoDB
app.post('/save-state', async function (req, res) {
  const orderNumber = req.body.orderNumber;

  // Concatenate the values of the placeholder to create a search string
  const searchString = `${orderNumber}${req.body.isAccepted}${req.body.isRefused}${req.body.isOnMyWay}${req.body.isDone}${req.body.isNotStarted}`;

  // Check if a placeholder with the same order number and values already exists
  const placeholder = await State.findOne({
    $and: [
      { orderNumber: orderNumber },
      { isAccepted: req.body.isAccepted },
      { isRefused: req.body.isRefused },
      { isOnMyWay: req.body.isOnMyWay },
      { isDone: req.body.isDone },
      { isNotStarted: req.body.isNotStarted }
    ]
  });

  if (placeholder) {
    console.log("Placeholder already exists in database");
    res.status(200).send("Placeholder already exists in database");
  } else {
    console.log("Creating a new placeholder .... ")
    // Create a new placeholder if it doesn't already exist
    const newPlaceholder = new State({
      orderNumber: orderNumber,
      isAccepted: req.body.isAccepted,
      isRefused: req.body.isRefused,
      isOnMyWay: req.body.isOnMyWay,
      isDone: req.body.isDone,
      isNotStarted: req.body.isNotStarted,
      searchString: searchString
    });

    await newPlaceholder.save();
    console.log("Placeholder saved to database");
    res.status(200).send("Placeholder saved to database");
  }
});

// Create a route that retrieves all states from MongoDB
app.get('/get-state', (req, res) => {
  State.find({})
    .then((docs) => {
      const states = docs.map((doc) => doc.toObject());
      console.log(states)
      res.send(states);
    })
    .catch((error) => {
      console.log("Error retrieving states from database: ", error);
      res.json(states)
      res.status(500).send("Error retrieving states from database");
    });
});


// route to display the HTML table with user data
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
    // console.log(users);

    // res.render('users.ejs', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/getAddr', async (req, res) => {
    // retrieve the stored address from the global variable
    const storedAddr = globalAdr;
const adresse= sharedAdresse.adresse;
      // send the paragraphs as a JSON response
      // res.json(storedAddr.map(p => p.text));
    res.json(adresse);
    console.log(adresse);

});



// Define endpoint for receiving incoming messages from Chatfuel
app.post('/incoming', (req, res) => {
  const userId = req.body.chatfuel_user_id;
  const botId = req.body.chatfuel_bot_id;
  const token = req.body.chatfuel_token;

  // Construct the message payload
  const payload = {
    chatfuel_token: token,

    chatfuel_block_name: 'incoming',
    chatfuel_attributes: {
      key1: 'A',
      key2: 'value2',
      // Add more attributes as needed
    }
  };
})


module.exports = User;
module.exports = Placeholder;
// module.exports = handleWebhook;
module.exports = mongoose.model('User', userSchema);