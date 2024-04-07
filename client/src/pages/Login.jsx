import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers :{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
      email,
      password
    })
    })
    const data = await response.json()
    if (data.status === 'ok' && data.user) {
      alert('Logged in successfully!');
      setEmail('');
      setPassword('');
    } else{
      alert('Enter valid user id or password')
    }
  }
  


  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen  text-black' style={{backgroundColor: '#242526'}}>
      <Link to='/'><p className='ml-72 text-xl flex items-center gap-2 text-blue-200 tracking-wide font-bold cursor-pointer mb-2 hover:opacity-85'><i class="fa-solid fa-arrow-left"></i>Home</p></Link> 
    <div className="flex flex-col gap-8 bg-white p-10 rounded-xl">
      <h1 className='text-5xl font-bold tracking-wide '>Login Form</h1>
      <form onSubmit={handleLogin} className='flex flex-col text-2xl'>
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
        <button className='bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4 rounded-lg text-2xl text-white hover:opacity-85'>Submit</button>
        <div className='flex flex-col items-center'>
        <p className='mt-2'><Link to='/password-reset' className='text-blue-800 font-bold'>Forgot Password?</Link> </p>
        <p className='mt-2'>*Haven't Registered? <Link to='/register' className='text-blue-800'>Register</Link> </p>
        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default Login
