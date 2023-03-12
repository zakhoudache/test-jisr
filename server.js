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

// const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'src/public/Images' });
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


// Set the Content Security Policy header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "style-src 'self' 'unsafe-inline'");

  next();
});

// Render the HTML file with the nonce value in the style tag
app.get('/', (req, res) => {
  res.setHeader('Content-Security-Policy', "style-src 'self' 'unsafe-inline'");

  const filePath = path.join(__dirname, 'htmlFolder', 'page1.html');
  res.sendFile(filePath)
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
  const filePath = path.join(__dirname, 'htmlFolder', 'page1.html');
  res.sendFile(filePath)
});


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
// const mongoose = require('mongoose');ss

// Connect to MongoDB
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// const uri = 'mongodb://mongo:ppBUD8hmf6puVdcDX5FQ@containers-us-west-28.railway.app:5954';
// const uri =`mongodb+srv://zhoudache:alcahyd2023@cluster0.ughawgz.mongodb.net/test`

const uri = `mongodb+srv://zhoudache:alcahyd2023@cluster0.ughawgz.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
  const bucket = new GridFSBucket(db.db);
  // Your code using the bucket object goes here
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'src/public/Images/';
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
          console.log('File downloaded successfully from the path :', localPath);
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
  const imagePath = path.join(__dirname, `src/public/Images/${req.body.fileName}`, imageName);
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
  console.log('Chifa image uploaded successfully to the path : ', imagePath, tempUser.chifaImage);

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
const imagePathO = path.join(__dirname, `src/public/Images/${req.body.fileName}/Ordonnance@${req.body.fileName}${counter}.${extension}`);
console.log(imagePathO);


const chifa_ordonnanceImages =[sharedData.imageNameChifa, imageName];

tempUser.chifa_ordonnanceImages = {

   coText : chifa_ordonnanceImages

}
console.log('Chifa and Ordonnance Both images sent together!',tempUser.chifa_ordonnanceImages);
res.send('Ordonnance image uploaded successfully and Chifa and Ordonnance Both images sent together!'); // rest of your code goes here
});

// /workspace/test-jisr/src/public/Images/Abdesslam
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