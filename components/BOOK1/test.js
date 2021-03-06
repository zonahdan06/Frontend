import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
const Test = () => {
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

  // the link to your model provided by Teachable Machine export panel
  const URL = "./my_model_4/";
  let model, webcam, ctx, labelContainer, maxPredictions;

  let status = 0; //0:stand, 1:squat, 2:x
  let keep_time = 0; //x 유지 시간

  async const init= ()=>{
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }

    let check_time = setInterval(() => {
      if (keep_time == 5) {
        keep_time = 0;
        new Audio(URL + "fail.mp3").play();
        clearInterval(check_time);
        webcam.stop();
      }
      keep_time++;
    }, 1000);
  }

  async const loop=(timestamp)=> {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  let count = 0;

  async const  predict=()=> {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    let audio;
    if (count == 10) {
      count = 0;
      webcam.stop();
      setTimeout(function() {
        new Audio(URL + "success.mp3").play();
      }, 1000);
    }
    if (prediction[0].probability.toFixed(2) > 0.9) {
      //stand 상태
      keep_time = 0;
      if (status == 1) {
        count++;
        audio = new Audio(URL + (count % 10) + ".mp3");
        audio.play();
      }
      status = 0;
    } else if (prediction[1].probability.toFixed(2) > 0.5) {
      //squat 상태
      keep_time = 0;
      status = 1;
    } else if (prediction[2].probability.toFixed(2) == 1.0) {
      //x 표시
      status = 2;
    }

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
  }

  const drawPose = (pose)=> {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }
  return (
    <div className="Test">
      
    </div>
  );
};
export default Test;
