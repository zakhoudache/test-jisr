
// const socket = io();
var socket
var dataURL;
let objectDetector;
let img;
var objects = [];
let status;
let count = 0;
let dir;
let fileName;
let imageChifa;
let imagePath;
let files;
let file;
let lastLine;
var canvas;
let previousFiles;
var fileContent;
let lastNameInFile;
var croppedimageName;
function preload() {
    fetch("http://127.0.0.1:5500/ListFilename.txt", {
        "headers": {
            "Access-Control-Allow-Origin": "*",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "fr-FR,fr;q=0.9,ar;q=0.8,en-US;q=0.7,en;q=0.6",
          "cache-control": "max-age=0",
          "if-modified-since": "Fri, 10 Feb 2023 17:02:05 GMT",
          "if-none-match": "W/\"128-1863c46e803\"",
          "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      }
    

      // Display the contents of the file
    
      
    )
    .then(response => response.text())
    .then(data => {
        fileContent = data.split('\n');
    //   console.log((data[5]));
    lastNameInFile=fileContent[fileContent.length-2];
      text(fileContent[fileContent.length-2], 10, 10, 380, 380)
      img= loadImage((fileContent[fileContent.length-2]));
    })
    .catch(error => console.error(error));   
	
  }

  
  function setup() {

	createCanvas(2500,2000);
	
	objectDetector = ml5.objectDetector('cocossd', modelReady);



function gotResult(err, results) {
	if (err) {
	  console.log(err) ;
	}
	objects = results;
    console.log((objects));
	saveResultImage();
  }

  
function modelReady() {
	console.log("model Ready!")
	let status = true;
	objectDetector.detect(img, gotResult);
  }
  
  
  
  function saveResultImage() {
	// Draw the image on the canvas
	image(img, 0, 0);
	for (let i = 0;i < objects.length; i++) {
	  noStroke();
	  fill(0, 255, 0);
	  text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x + 5, objects[i].y + 15);
	  noFill();
	  strokeWeight(4);
	  stroke(0, 255, 0);
	  rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
	  
	  let x = objects[i].x;
		let y = objects[i].y;
		let w = objects[i].width;
		let h = objects[i].height;
		let croppedImage = img.get(x, y, w, h);
         croppedimageName=lastNameInFile.split("@")[1]
        console.log(lastNameInFile);
        console.log(path);
        
        
        saveCanvas(`public/Images/PublicImages/cropped_${count}${croppedimageName}`);
		croppedImage.save(`cropped_${count}${croppedimageName}`);
        
        
		count++;
	
	  noLoop();
	}
	

  }


}



  function draw() {
   
  }
  
