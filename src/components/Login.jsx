import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.log('Error en el login:', error.message)
    else{ 
    console.log('Login exitoso')
    navigate('/'); // Redirecting to the home path
}
  }

  async function  handleGoogleLogin () {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })

    if (error) console.error('Error en la autenticación con Google:', error)
    else console.log('Autenticación con Google exitosa:', data)
  }

  return (
    <div>
      <div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleLogin}>Iniciar Sesión</button>
        <button onClick={handleGoogleLogin}>Iniciar Sesión con Google</button>
      </div>
    </div>
  )
}

export default Login
