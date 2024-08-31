import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [impNumber, setImpNumber] = useState(false);
  const [impCharacter, setimpCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)
  

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (impNumber) str += "0123456789";
      if (impCharacter) str += "!@#$%^&*";

      for (let i = 0; i < length; i++) {
       let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

  }, [length, impNumber, impCharacter, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,15)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, impCharacter, impNumber, passwordGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className='flex-shadow rounded-lg overflow-hidden mb-4'></div>
    <div className='flex items-center'>
        <label htmlFor="password" className='sr-only'>Password</label>
        <input 
            type="text"
            id="password"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref = {passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='ml-2 outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
    </div>
    <div className='flex text-sm gap-x-2 pt-2'>
      <div className='flex items-center gap-x-1'>
        <input 
          type="range"  
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
        />
        <label htmlFor="range">Length: {length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked = {impNumber}
          id = "numberInput"
          onChange={() => {
            setImpNumber((prev) => !prev)
          }}
        />
        <label htmlFor="numberInput">Number</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked = {impCharacter}
          id = "characterInput"
          onChange={() => {
            setimpCharacter((prev) => !prev)
          }}
        />
        <label htmlFor="numberInput">Character</label>
      </div>

    </div>
</div>    
    </>
  )
}

export default App
