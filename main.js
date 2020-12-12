status = "";
objects = [];
nameofobjects = ""
name = document.getElementById("name").value;
function preload() {
  
}
function setup() {
  canvas = createCanvas(380, 380);
  canvas.position(575, 135)
  video = createCapture(VIDEO);
  video.hide();
  video.size(380, 380)

  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("statuss").innerHTML = "Status : Detecting Objects"
}
function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    objectDetector.detect(video, gotResult)
    r = random(255);
    g = random(255)
    b = random(255)
    for (i = 0; i < objects.length; i++) {
      if (name == objects[i].label) {

        document.getElementById("statuss").innerHTML = "Status : Objects Detected";
        document.getElementById("name_of_objects").innerHTML = "object found:" + name;


      }
      else{
        document.getElementById("statuss").innerHTML = "Status : Objects Detected";
        document.getElementById("name_of_objects").innerHTML = "object not found:";
      }
      fill(r, g, b)
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + " % ", objects[i].x, objects[i].y);
      noFill();
      stroke(r, g, b)
      strokeWeight(3)
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
      
    }
  }


}

function modelLoaded() {
  console.log("Model Loaded!!")
  status = true;
  objectDetector.detect(video, gotResult)
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("statuss").innerHTML = "Status : Detecting Objects";

}
function gotResult(error, results) {
  if (error) {
    console.log(error);


  }
  else {
    console.log(results)
    objects = results;
  }
}
function start(){
      
  objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
  document.getElementById("statuss").innerHTML="Status : Detecting Objects";
 }