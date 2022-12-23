noseX = 0;
noseY = 0;
rightWristX = 0;
leftWristX = 0;
rightWristY = 0;
leftWristY = 0;
song1 = "";
song2 = "";
function preload() {
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(550, 450);
    canvas.position(500, 260);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Model Loaded");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX);
        console.log("rightWristX=" + rightWristX);
        console.log("leftWristY=" + leftWristY);
        console.log("rightWristY=" + rightWristY);
        console.log("Score of left wrist=" + results[0].pose.keypoints[9].score);

        if (results[0].pose.keypoints[9].score > 0.2) {
            song2.stop();
            if (song1.isPlaying() == false) {
                song1.play();
            }
        }

        if (results[0].pose.keypoints[10].score > 0.2) {
            song1.stop();
            if (song2.isPlaying() == false) {
                song2.play();
            }
        }

    }
}
function draw() {
    image(video, 0, 0, 600, 500);
}
function play() {
    song1.stop();
    song2.stop();
    song2.play();
}
function stop() {
    song1.stop();
    song2.stop();
}


