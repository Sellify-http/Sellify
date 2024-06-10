import React, { useState } from 'react'
import logo from '../Assets/Logo.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, SetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) =>{
        e.preventDefault();

        if(email && password){

            console.log(JSON.stringify({email, password}));
            fetch('http://localhost:4000/user/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email, password})
            })
            .then(res => res.json())
            .then(data => {
              if (data.token) {
                setError('');
                localStorage.setItem('token', data.token); 
                navigate('/home')
              } else {
                setError(data.message);
              }
            })
            .catch(err => {
                console.log("error", err);
        })
        } else{
            setError("Field(s) must not be empty")
        }
}

  return (
    <section className="bg-gray-50 dark:bg-gray-900 " 
   
  >

  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 opacity-1">
      <a href="#" className="flex items-center  mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-10 h-10 mr-4 rounded-full" src={logo} alt="logo"/>
          Sellify    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
              </h1>
              <div className=' text-red-500'>
                {error? error: ''}
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" value={email} onChange={(e) => SetEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                 
                 <div>

                  <button type="submit " className="text-white w-full  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                 </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login;