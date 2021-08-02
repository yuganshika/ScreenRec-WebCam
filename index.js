var video = document.querySelector("#videoElement");
var startButton = document.querySelector("#startButton");
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||navigator.mozGetUserMedia|| navigator.msGetUserMedia||navigator.oGetUserMedia;
function turnCamOn(){
  if(navigator.getUserMedia){
    navigator.getUserMedia({video:true}, handleVideo, videoError);
  }
  function handleVideo(stream){
    video.srcObject = stream;
    video.play();
  }
  function videoError(e){

  }
}
function CamOff(stream) {
    video.srcObject = stream;
    video.pause();
    //video.src = "";
    stream.getTracks()[0].stop();;

}
function turnRecOn(){
  const start = async() =>{
    const stream = await navigator.mediaDevices.getDisplayMedia(
      {
        video:{
          mediaSource: "screen",
        },
      });
      const data=[];
      const mediaRecorder= new MediaRecorder(stream);

      mediaRecorder.ondataavailable=(e) =>{
        data.push(e.data);
      }
      mediaRecorder.start();
      mediaRecorder.onstop=(e)=>{
        document.querySelector("#videoElement2").src=URL.createObjectURL(
          new Blob(data,{
            type:data[0].type,
          })
        );
      };
};

start();

}
