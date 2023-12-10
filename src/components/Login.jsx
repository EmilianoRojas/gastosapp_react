import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { GoogleIcon } from '../assets/Icons/GoogleIcon';
import { EyeSlashFilledIcon } from '../assets/Icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../assets/Icons/EyeFilledIcon';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function handleLogin() {
    setErrorMessage('');

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log('Error en el login:', error.message);
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      console.log('Login exitoso');
      navigate('/'); // Redirecting to the home path
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      setErrorMessage(error.message);
      console.error('Error en la autenticación con Google:', error);
      setLoading(false);
    } else {
      console.log('Autenticación con Google exitosa:', data);
      setLoading(false);
    }
  }

  const ErrorCard = () => {
    if (!errorMessage) return null; // Don't render if no error
    return (
      <div className=" bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">{errorMessage}</span>
      </div>
    );
  };

  return (
    <div className="flex h-screen justify-center flex-col p-4 gap-3">
      <div className="self-center">
        <ThemeSwitcher />
      </div>
      <ErrorCard />
      <div className="flex flex-col gap-2 w-full">
        <Input size="sm" type="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          label="Password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-4xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-4xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          size="sm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="primary" isLoading={loading} onClick={handleLogin}>
          Iniciar Sesión
        </Button>
        <Button onClick={handleGoogleLogin}>
          <GoogleIcon />
          Sign up with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
