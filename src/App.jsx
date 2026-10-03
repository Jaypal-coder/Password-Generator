import { useState , useCallback ,useEffect ,useRef} from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [length , setLength] = useState(8)
  const [charAllowed , setCharAllowed] = useState(false)
  const [numAllowed , setNumAllowed] = useState(false)
  const [password , setPassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="-=[]$^&#@/_~`"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length , charAllowed , numAllowed , setPassword])
  
  //Ref hook
  const passRef=useRef(null)
  const passcopy = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
     passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
  <div className='page'>
    <h1>Password Generator</h1>

     <div className='box'>
      <div className='top-row'>

        <input 
          type='text'
          value={password}
          ref={passRef}
        >
        </input>

        <button 
          onClick={passcopy}>Copy
        </button>
      </div>

        <div className='bottom-row'>
        <input 
          type='range'
          min={6}
          max={100}
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}
        ></input>
        <label>Length : {length}</label>

        <input 
          type='checkbox'
          defaultChecked={numAllowed}
          onChange={()=>{
            setNumAllowed((prev)=>!prev)
        }}
        ></input>
        <label>Numbers Allowed</label>

        <input 
          type='checkbox'
          defaultChecked={charAllowed}
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
        }}
        ></input>
        <label>Characters Allowed</label>

        </div>
     </div>
  </div>
  
  )
}

export default App
