import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);

  const [charsAllowed, setcharsAllowed] = useState("False");

  const [numbersAllowed, setnumbersAllowed] = useState("False");

  const [password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) {
      str += "0123456789";
    }

    if (charsAllowed) {
      str += "[]{}~!@#$%^&*()";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbersAllowed, charsAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charsAllowed, numbersAllowed, passwordGenerator]);

  return (
    <>
      <div className="box">
        <h1 className="heading">Password Generator</h1>

        <div className="pass-copy">
          <input
            className="password-button"
            type="text"
            value={password}
            ref={passwordRef}
            placeholder="password"
            readOnly
          />
          <button id="copyButton">Copy</button>
        </div>

        <div className="input-field">
          <div className="range field">
            <input
              type="range"
              className="range-button"
              value={length}
              min={8}
              max={24}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="input-value">Length : {length}</label>
          </div>

          <div className="number field">
            <input
              type="checkbox"
              id="number-button"
              defaultChecked={numbersAllowed}
              onChange={() => {
                setnumbersAllowed((prev) => !prev);
              }}
            />
            <label className="input-value">Numbers</label>
          </div>

          <div className="char field">
            <input
              type="checkbox"
              id="char-button"
              defaultChecked={charsAllowed}
              onChange={() => {
                setcharsAllowed((prev) => !prev);
              }}
            />
            <label className="input-value">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
