import * as React from "react";
import {
  DialogueRoom,
  Dialogue,
  handleOnClickSendingMessage,
  handleNameOnEnterClickedPressedWtf,
  Register,
} from "../ts/frontend";

import Logo from "./logo.png";
import BannerLeft from "./banner_left.png";
import { useEffect, useState } from "react";
import { AuthProvider, UseAuthUser } from "../ts/contexts";
//<input type="button" value="Отправить" className="btn-danger" />

export function MessForm() {
  return (
    <form id="messForm">
      <div className="form_form">
        <label htmlFor="username" className="username">
          Никнейм
        </label>
        <div className="form_message">
          <DialogueRoom />
        </div>
      </div>
    </form>
  );
}

export function SendMessage({
  currentDialogue,
}: {
  currentDialogue: Dialogue | null;
}) {
  const dialogue = currentDialogue;
  const [message, setMessage] = React.useState("");
  const handleInput = (event: any) => {
    setMessage(event.target.value);
  };

  useEffect(() => {}, [message]);

  return (
    <div className="send_message">
      <textarea
        name="message"
        id="message"
        className="form-control"
        placeholder="Введите сообщение"
        onChange={handleInput}
        value={message}
      ></textarea>
      <br />
      <br />
      <br />
      <input
        type="button" // Changed from "button" to "submit" for form submission
        value="Отправить"
        className="btn-danger"
        onClick={() => {
          setMessage("");
          if (dialogue !== null) {
            handleOnClickSendingMessage(dialogue, message);
          }
        }}
      />
    </div>
  );
}

export function AB() {
  const [dialogue, setDialogue] = React.useState<Dialogue | null>(null);
  let { LogOut } = UseAuthUser();

  const handleNameOnEnter = (event: any) => {
    if (event.key === "Enter") {
      setDialogue(new Dialogue(-1, event.target.value));
      if (dialogue !== null) {
        handleNameOnEnterClickedPressedWtf(dialogue);
      }
    }
  };

  return (
    <>
      <div className="header_container">
        <img src={Logo} alt="Logo" />
        <div className="return_to_registration">
          <a
            onClick={async () => {
              await LogOut();
            }}
          >
            <p>Выйти</p>
          </a>
        </div>
      </div>

      <div className="main">
        <div className="chat_form_container">
          <div className="chat_form_description">
            <h2>Чаты</h2>
            <h3>Сообщения</h3>
          </div>

          {dialogue ? (
            <>
              <MessForm />
              <SendMessage currentDialogue={dialogue} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export function Main() {
  let { LogOut, LogIn, isLoggedIn, User } = UseAuthUser();

  console.log(User);
  return isLoggedIn ? <AB /> : <Register />;
}

export default function MyApp() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
