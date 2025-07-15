import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.get('/sanctum/csrf-cookie');

      const csrfToken = getCookie('XSRF-TOKEN');
      if (csrfToken) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
      }

      const response = await axios.post('/api/login', {
        email,
        password,
      });

      console.log('Login success:', response.data);
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    if (response.data.user.user_type === 'super_admin') {
      navigate('/admin');
    } else {
      navigate('/admin/users/UserListtt');
    }
  } catch (error) {
    console.error('Login error:', error);
    setError("Login failed. Please check your credentials.");
  }
};

  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      <main className="mt-0 transition-all duration-200 ease-in-out">
        <section>
          <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
            <div className="container z-1">
              <div className="flex flex-wrap -mx-3">
                <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                  <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 dark:bg-gray-950 rounded-2xl bg-clip-border">
                    <div className="p-6 pb-0 mb-0">
                      <h4 className="font-bold">Sign In</h4>
                      <p className="mb-0">Enter your email and password to sign in</p>
                    </div>
                    <div className="flex-auto p-6">
                      <form onSubmit={handleLogin}>
                        <div className="mb-4">
                          <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="text-sm leading-5.6 block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                          />
                        </div>
                        <div className="mb-4">
                          <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="text-sm leading-5.6 block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                          />
                        </div>

                        {error && (
                          <div className="mb-2 text-red-600 text-sm">
                            {error}
                          </div>
                        )}

                        <div className="text-center">
                          <button 
                            type="submit"
                            className="w-full px-16 py-3.5 mt-6 mb-0 font-bold text-white bg-blue-500 rounded-lg hover:-translate-y-px hover:shadow-md transition-all"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 text-center pt-0 px-1 sm:px-6">
                      <p className="mx-auto mb-6 leading-normal text-sm">
                        Don't have an account?
                        <a href="/sign-up" className="font-semibold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500">
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
                  <div 
                    className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')] rounded-xl"
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-blue-500 to-violet-500 opacity-60"></span>
                    <h4 className="z-20 mt-12 font-bold text-white">"Attention is the new currency"</h4>
                    <p className="z-20 text-white">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
