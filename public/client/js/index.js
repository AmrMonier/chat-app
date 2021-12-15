var socket = io();
const chatForm = document.querySelector("#send-message");
console.log(chatForm);
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = document.querySelector("#msg-input");

  socket.emit("message", msg.value);
  msg.value = null;
});

socket.on("message", (msg) => {
  console.log(msg);
});
socket.on("userDisconnected", (msg) => {
  console.log(msg);
});

socket.on("newUser", (msg) => {
  console.log(msg);
});

const shareLocation = document.querySelector("#share-location");
shareLocation.addEventListener("click", (e) => {
  if (!navigator.geolocation)
    return alert("Your Browser dosen't support geolocation");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "share-location",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (msg) => {
        console. log(msg);
      }
    );
   
  });
});

socket.on("share-location", (location) => {
  console.log(location);
});
