import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister(e) {
    e.preventDefault()

    //sending data to backend
    const response = await fetch('http://localhost:1337/api/register', { 
      method: 'POST',
      headers :{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
      name,
      email,
      password
    })
    })
    const data = await response.json()
    if(data.status === 'ok'){
      alert("User Registered")
      setName('')
      setEmail('')
      setPassword('')
    } else{
      alert("Invalid attempt, try again")
    }
  }

  const handleReset = useCallback((e) => {
    e.preventDefault();
    setName('')
    setEmail('')
    setPassword('')
  }, [email, name, password])

  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen  text-black' style={{backgroundColor: '#242526'}}>
    <Link to='/'><p className='ml-72 text-xl flex items-center gap-2 text-blue-200 tracking-wide font-bold cursor-pointer mb-2 hover:opacity-85'><i class="fa-solid fa-arrow-left"></i>Home</p></Link>
    <div className="flex flex-col gap-8 bg-white p-10 rounded-xl">
      <h1 className='text-5xl font-bold tracking-wide '>Signup Form</h1>
      <form onSubmit={handleRegister} className='flex flex-col text-2xl'>
        <label>Enter Username</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Username'
          className='mb-4 border-2 border-black p-2'
        />
        <label>Enter Email ID</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email ID'
          className='mb-4 border-2 border-black p-2'
        />
        <label>Enter Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          minLength={6}
          maxLength={10}
          className='mb-8 border-2 border-black p-2'
        />
        <div className='flex gap-4 mx-2 justify-between'>
        <button className='bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4 rounded-lg text-2xl text-white hover:opacity-70 w-32'>Submit</button>
        <button className='bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4 rounded-lg text-2xl text-white hover:opacity-70 w-32' onClick={handleReset}>Reset</button>
        </div>
        <p className='mt-2'>*Already Registered? <Link to='/login' className='text-blue-800'>Login</Link> </p>
      </form>
    </div>
    </div>
    </>
  )
}

export default App
