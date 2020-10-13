// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    fileTrigger = document.querySelector("#file--trigger"),
    fileInput=document.querySelector("#image-file");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Erro.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

fileTrigger.onclick = function() {
  $( "#image-file" ).trigger("click");
};

$( "#image-file" ).on( "change", function(e) {
  for(let i=0;i<e.target.files.length;i++)
  {
    let file = e.target.files[i];
  
    cameraOutput.src =URL.createObjectURL(file);
  }
});




// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

