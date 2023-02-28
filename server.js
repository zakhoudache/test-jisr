const express = require("express");
const hostname = "127.0.0.1";
const session = require('express-session');
const app = express();
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { spawn } = require('child_process');

let sharedData;


const ngrok = require('ngrok');



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Security-Policy: none')
  // res.header("ngrok-skip-browser-warning","true");
  next();
});

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));


// ngrok.connect({ addr: 8002 }, (err, url) => {
//   if (err) {
//     console.error('Error starting ngrok', err);
//     return;
//   }
//   console.log(`ngrok tunnel is active at ${url}`);
// });



// ngrok.connect({
//   addr: 8002,
//   authtoken: '2M5XgItMGFOxsWVsakdcSCkfRBl_6LuyjHVb6jfgv8hohCv72',
// }).then(url => {
//   console.log(`Tunnel is open at ${url}`);
// }).catch(error => {
//   console.error('Error opening tunnel:', error);
// });




// (async function() {
//   try {
//     // Start an SSH tunnel using ngrok
//     const url = await ngrok.connect({
//       proto: 'tcp',
//       addr: 443,
//       authtoken: '2M5XgItMGFOxsWVsakdcSCkfRBl_6LuyjHVb6jfgv8hohCv72',
//     });
//     console.log(`SSH tunnel created at: ${url}`);

//     // Spawn a new ssh process using the ngrok URL
//     const sshProcess = spawn('ssh', ['-o', 'StrictHostKeyChecking=no', '-J', url, 'MCS@localhost']);

//     sshProcess.stdout.on('data', data => console.log(data.toString()));
//     sshProcess.stderr.on('data', data => console.error(data.toString()));
//     sshProcess.on('exit', code => console.log(`SSH process exited with code ${code}`));
//   } catch (error) {
//     console.error('Failed to create SSH tunnel:', error);
//   }
// })();

app.listen(8002,() => {
  console.log(`Server running at http://localhost:${8002}`);
});

app.post('/chifa', async (req, res, next) => {
  let fileName = req.body.fileName;
  let dir = `src\\public\\Images\\${fileName}`;
  let imageChifa = req.body.imageChifa;
  let imagePath = path.join(dir, `Chifa@${fileName}.jpg`);

  req.session.fileName = fileName;
  req.session.dir = dir;
  req.session.imageChifa = imageChifa;
  req.session.imagePath = imagePath;

  sharedData = { 
    dir: `src\\public\\Images\\${fileName}`,
    imageChifa: imageChifa,
    fileName: fileName,
    imagePath: imagePath
  };

  res.send('Data saved');

  if (!imageChifa) {
    return res.status(400).send({ error: 'imagedata is required' });
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let counter = 0;
  while (fs.existsSync(imagePath)) {
    counter += 1;
    imagePath = path.join(dir, `Chifa@${fileName}${counter}.jpg`);
  }

  const writeToFile = (text) => {
    fs.appendFile('ListFilename.txt', text + ' \n', (err) => {
      if (err) throw err;
      console.log(`I'm ${req.session.fileName} My path's text was appended to ListFilename.txt ! and here it is : ${text}`);
    });
  };
  writeToFile(imagePath);

  axios({
    method: 'get',
    url: imageChifa,
    responseType: 'stream'
  })
    .then(function (res) {
      res.data.pipe(fs.createWriteStream(imagePath));
    });
});

app.use("/", (req, res) => {
  res.send("fffffffffffffffff")
})


app.post('/ordonnance', async (req, res, next) => {
  let fileName = req.body.fileName;
  let dir = `src\\public\\Images\\${fileName}`;
  let imageOrdonnance = req.body.imageOrdonnance;
  let imagePath = path.join(dir, `Ordonnance@${fileName}.jpg`);

  req.session.fileName = fileName;
  req.session.dir = dir;
  req.session.imageOrdonnance = imageOrdonnance;
  req.session.imagePath = imagePath;

  sharedData = { 
    dir: `src\\public\\Images\\${fileName}`,
    imageOrdonnance: imageOrdonnance,
    fileName: fileName,
    imagePath: imagePath
  };

  res.send('Data saved');

  if (!imageOrdonnance) {
    return res.status(400).send({ error: 'imagedata is required' });
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let counter = 0;
  while (fs.existsSync(imagePath)) {
    counter += 1;
    imagePath = path.join(dir, `Ordonnance@${fileName}${counter}.jpg`);
  }

  const writeToFile = (text) => {
    fs.appendFile('ListFilenameOrdonnance.txt', text + '\n', (err) => {
      if (err) throw err;
      console.log(`I'm ${req.session.fileName} My path's text was appended to ListFilenameOrdonnance.txt ! and here it is : ${text}`);
      // console.log('The text was appended to file!');
    });
  };
  writeToFile(imagePath);

  axios({
    method: 'get',
    url: imageOrdonnance,
    responseType: 'stream'
  })
    .then(function (res) {
      res.data.pipe(fs.createWriteStream(imagePath));
    });
});


// const admin = require('firebase-admin');

//   // Initialize Firebase
//   const serviceAccount = require('C:\\Users\\MCS\\OneDrive\\Desktop\\Jisr pharmacy\\firstprojectt-2c1de-firebase-adminsdk-c2kai-5df1d0560e.json');
  
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://firstprojectt-2c1de-default-rtdb.firebaseio.com'
//   });
  
app.post('/Postaddr',async (req, res, next) => {
  let Adr = req.body.Adr;
  req.session.Adr=Adr;

  sharedData = { 
    Adr: Adr
  };

  res.send('Data saved');
  console.log(Adr)
  
  

  const message = {
    chatfuel_token: 'HAEZnzGAbTVZeN8RYbFodOdq3cFYBBmb6eFc34SnStOPonQcmk5brpWhgvNhaWgg', // the token for the sending chatbot
    chatfuel_message_tag: 'CHATFUEL_MESSAGE_TAG', // the message tag for the message (optional)
    chatfuel_block_id: '63f4f7841d0ea92711afe86b', // the ID of the block in the receiving chatbot to trigger
    chatfuel_user_id: '6155861414436575', // the user ID of the user to send the message to in the receiving chatbot
    custom_payload: { message: Adr } // the message you want to send
  };
  console.log(message.custom_payload.message)
  res.end(`lets send ${message.custom_payload.message}`);
  

  // // Store the message sent by the first Chatfuel chatbot in Firebase
  // admin.database().ref('messages').set({
  //   message: message
  // });
  
  // // Retrieve the stored message in your webhook
  // admin.database().ref('messages').once('value')
  //   .then((snapshot) => {
  //     const message = snapshot.val().message;
  //     console.log(message);
  //     // Use the message in your webhook logic to trigger the desired action
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  
  // Define the URL for the receiving chatbot's JSON API
  const url = `https://api.chatfuel.com/bots/63f49b619557a962ef4bfc7b/users/${message.chatfuel_user_id}/send?chatfuel_token=${message.chatfuel_token}&chatfuel_block_id=${message.chatfuel_block_id}`;
  
  // Send the message using a POST request
  request.post({
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message.custom_payload)
  }, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
  
  console.log(Adr)
  // console.log(adresse)
 
  // console.log(res)
}
)

app.get('/pharma', function (req, res){   

    const filePath = path.join(__dirname, "" ,"Pharmacywindow.html");
    res.sendFile(filePath);
    

  })
console.log(sharedData)
  

  
  const request = require('request');

  // Define the message parameters
  



