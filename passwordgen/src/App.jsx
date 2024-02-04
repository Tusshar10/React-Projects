import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");
  const passwordRef = useRef(null);

  const passGen = useCallback(() => {
    let pas = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "1234567890";
    if (char) str += "!@#$%^&*(){}[]+=-_";

    for (let i = 0; i < length; i++) {
      let c = Math.floor(Math.random() * str.length);
      pas += str.charAt(c);
    }
    setPass(pas);
  }, [length, num, char, setPass]);

  useEffect(() => {
    passGen();
  }, [length, num, char, setPass]);

  const copyPass = () => {
    passwordRef.current?.select();
    document.execCommand('copy');
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-md mx-auto p-6 rounded-md bg-gray-800 shadow-lg">
          <h1 className="text-3xl font-semibold mb-4 text-center">Password Generator</h1>
          <div className="mb-4">
            <input
              type="text"
              ref={passwordRef}
              value={pass}
              placeholder="Generated Password"
              className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 outline-none"
              readOnly
            />
          </div>
          <button onClick={copyPass} className="bg-blue-700 text-white px-4 py-2 rounded-md">
            Copy
          </button>
          <div className="mt-4">
            <label className="block text-sm mb-1">Password Length: {length}</label>
            <input
              type="range"
              onChange={(e) => setLength(e.target.value)}
              min={6}
              max={20}
              value={length}
              className="w-full cursor-pointer"
            />
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="numberInput"
              checked={num}
              onChange={() => setNum((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="characterInput"
              checked={char}
              onChange={() => setChar((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="characterInput">Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
