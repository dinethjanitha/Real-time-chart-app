const socket = io();

const chatForm = document.getElementById("chatform");
const sendMessage = document.getElementById("sendMessage");

//GET username and room;

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username, room);

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const mzg = e.target.elements.mzg.value;

  console.log(mzg);

  socket.emit("chatmessage", mzg);

  outputMessage(mzg);

  e.target.elements.mzg.value = "";
});

socket.on("message", (mzg) => {
  console.log(mzg);
  ChatAppOutputMessage(mzg);
});

socket.on("chatmessage", (mzg) => {
  console.log("Revived: " + mzg);
  if (mzg.username !== "User") {
    ChatAppOutputMessage(mzg);
  }
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("bg-info");
  div.classList.add("your-text-meessage");
  div.classList.add("p-2");
  div.classList.add("mt-1");
  div.innerHTML = `<span class="text-header">Dineth 8:00PM</span>
                    <p>
                      ${message}
                    </p>`;

  document.getElementById("chatBox").appendChild(div);
}

function ChatAppOutputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("bg-info");
  div.classList.add("text-meessage");
  div.classList.add("p-2");
  div.classList.add("mt-1");
  div.innerHTML = `<span class="text-header">${message.username} ${message.time}</span>
                    <p>
                      ${message.text}
                    </p>`;

  document.getElementById("chatBox").appendChild(div);
}
