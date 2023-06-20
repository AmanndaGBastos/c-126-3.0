var song=""

function preload(){
    song= loadSound('music.mp3');
}
var scoreRigthwrist=0
var scoreLeftwrist=0
var rigthWristX=0
var rigthWristY=0
var leftWristX=0
var leftWristY=0

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialized")
}
function gotPoses(results)
  {
    if(results.length > 0)
    {
      console.log(results);
     scoreRigthwrist = results[0].pose.keypoints[10].score
     scoreLefthwrist = results[0].pose.keypoints[9].score
     console.log("scoreRigthtWrist = " + scoreRigthWrist + " scoreLeftWrist = " + scoreLeftWrist);

      rigthWristX= results[0].pose.rigthWrist.x
      rigthWristY= results[0].pose.rigthWrist.y
      console.log("rightWristx = " + rigthWristX + " rigthWristy = " + rigthWristY);
   
     leftWristX= results[0].pose.leftWrist.x
     lefthWristY= results[0].pose.leftWrist.y
      console.log("leftWristx = " + leftWristX + " leftWristy = " + leftWristY);
     } 
      }
  function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000")
    stroke("#FF0000")
    if(scoreRigthwrist > 0.2){
      circle(rigthWristX,rigthWristY ,20)
      if(rigthWristY > 0 && rigthWristY <=100) {
        document.getElementById("speed").innerHTML="velocidade = 0.5x"
        song.rate(0.5)

      }else if(rigthWristY > 100 && rigthWristY <=200){
        document.getElementById("speed").innerHTML="velocidade = 1"
        song.rate(1)
      }else if(rigthWristY > 200 && rigthWristY <=300){
        document.getElementById("speed").innerHTML="velocidade = 1.5"
        song.rate(1.5)
      }else if(rigthWristY > 300 && rigthWristY <=400){
        document.getElementById("speed").innerHTML="velocidade = 2"
        song.rate(2)
      }else if(rigthWristY > 400)
      document.getElementById("speed").innerHTML="velocidade = 2.5"
      song.rate(2.5)} 
     }
     if(scoreLeftwrist > 0.2){
      circle( leftWristX, leftWristY, 20)
      var isNumberleftWristY=Number(leftWristY)
      var remove_decimals=floor(isNumberleftWristY)
      var volume = remove_decimals/500
      song.setVolume(volume)
      document.getElementById("volume").innerHTML="Volume "+ volume
     }
    
  function play(){
    song.play()
    song.setVolume(0.5)
    song.rate(2.5)
  }