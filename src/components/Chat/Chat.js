import { AiOutlineClose } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import "./Chat.css";

function Chat(props) {
  function MsgSubmit(e) {
    e.preventDefault();
    const MsgText = e.target[0].value;
    if (!MsgText) return;
    appendMsg("User", "right", MsgText);
    e.target[0].value = "";
    botResponse(MsgText);
  }
  function appendMsg(name, side, text) {
    const MsgHTML = `
        <div class='msg-${side}'>
            <img src='./img/boy.png'></img>
            <div class='msg-details msg-bubble'>
                    <h4>${name}</h4>
                    <p>${text}</p>
                    <span>${getDate()}</span>
            </div>
        </div>
        `;
    const box = document.querySelector(".chat .msg-box");
    box.insertAdjacentHTML("beforeend", MsgHTML);
    box.scrollTop += 500;
  }
  async function botResponse(text) {
    try {
      const response = await fetch("/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: text, language: props.language }),
      });
      //console.log(response)
      const data = await response.json();
      console.log(data);
      setTimeout(() => {
        appendMsg("Chatbot", "left", data.msg);
      }, 1500);
    } catch (e) {
      console.log(e.massage);
    }
  }
  function getDate(date) {
    const houre = new Date().getHours();
    const h = houre > 12 ? "0" + (((houre - 1) % 12) + 1) : "0" + houre;
    const minutes = "0" + new Date().getMinutes();
    const time = h.slice(-2) + ":" + minutes.slice(-2);
    return houre <= 12 ? time + " AM" : time + " PM";
  }
  function close(e) {}
  return (
    <div className="chat" data-show="false">
      <header>
        <h4>{props.value.h4}</h4>
        <a className="close" onClick={getDate}>
          {" "}
          <AiOutlineClose />{" "}
        </a>
      </header>
      <div className="msg-box">
        <div className="msg-left ">
          <img src="./img/boy.png"></img>
          <div className="msg-details msg-bubble">
            <h4>Chatbot</h4>
            <p>{props.value.p}</p>
            <span>{getDate()}</span>
          </div>
        </div>
      </div>
      <form className="msg-form" onSubmit={MsgSubmit}>
        <input
          className="msg-content"
          type="text"
          placeholder={props.value.input}
        ></input>
        <button className="msg-submit" type="submit">
          <MdSend />
        </button>
      </form>
    </div>
  );
}

export default Chat;
