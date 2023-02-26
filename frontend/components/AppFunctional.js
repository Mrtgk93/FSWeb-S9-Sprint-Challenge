import axios from "axios";
import { response } from "msw";
import React, { useState } from "react";

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [initialMessage, setInitialMessage] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialSteps, setInitialSteps] = useState(0);
  const [initialIndex, setInitialIndex] = useState(4);
  const [kordinat, setKordinat] = useState([2, 2]);

  function reset() {
    setInitialIndex(4);
    setInitialMessage("");
    setInitialSteps(0);
    setInitialEmail("");
    setKordinat([2, 2]);

    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  const moveUp = () => {
    setInitialMessage("");

    if (initialIndex > 2) {
      // Eğer simge üst kenarda değilse
      setInitialIndex(initialIndex - 3);
      // currentPosition'ı 3 azaltarak simgeyi yukarı hareket ettirin
      setInitialSteps(initialSteps + 1);
      setKordinat([kordinat[0], kordinat[1] - 1]);
    } else {
      setInitialMessage("Yukarıya gidemezsiniz");
    }
  };
  const moveDown = () => {
    setInitialMessage("");

    if (initialIndex < 6) {
      // Eğer simge alt kenarda değilse
      setInitialIndex(initialIndex + 3);
      // currentPosition'ı 3 artırarak simgeyi aşağı hareket ettirin
      setInitialSteps(initialSteps + 1);
      setKordinat([kordinat[0], kordinat[1] + 1]);
    } else {
      setInitialMessage("Aşağıya gidemezsiniz");
    }
  };
  const moveLeft = () => {
    setInitialMessage("");

    if (initialIndex % 3 > 0) {
      // Eğer simge sol kenarda değilse
      setInitialIndex(initialIndex - 1);
      // currentPosition'ı 1 azaltarak simgeyi sola hareket ettirin
      setInitialSteps(initialSteps + 1);
      setKordinat([kordinat[0] - 1, kordinat[1]]);
    } else {
      setInitialMessage("Sola gidemezsiniz");
    }
  };
  const moveRight = () => {
    setInitialMessage("");

    if (initialIndex % 3 < 2) {
      // Eğer simge sağ kenarda değilse
      setInitialIndex(initialIndex + 1);
      // currentPosition'ı 1 artırarak simgeyi sağa hareket ettirin
      setInitialSteps(initialSteps + 1);
      setKordinat([kordinat[0] + 1, kordinat[1]]);
    } else {
      setInitialMessage("Sağa gidemezsiniz");
    }
  };

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setInitialEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();

    axios
      .post("http://localhost:9000/api/result", {
        x: kordinat[0],
        y: kordinat[1],
        steps: initialSteps,
        email: initialEmail,
      })
      .then((response) => setInitialMessage(response.data.message))
      .catch((error) => setInitialMessage(error.response.data.message));
    setInitialEmail("");
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Koordinatlar ({kordinat[0]},{kordinat[1]})
        </h3>
        <h3 id="steps">{initialSteps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === initialIndex ? " active" : ""}`}
          >
            {idx === initialIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{initialMessage}</h3>
      </div>
      <div id="keypad">
        <button onClick={moveLeft} id="left">
          SOL
        </button>
        <button onClick={moveUp} id="up">
          YUKARI
        </button>
        <button onClick={moveRight} id="right">
          SAĞ
        </button>
        <button onClick={moveDown} id="down">
          AŞAĞI
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          id="email"
          type="email"
          placeholder="email girin"
          value={initialEmail}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
