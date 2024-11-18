import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { z } from 'zod';

// Definindo o esquema de validação com Zod
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const result = registerSchema.safeParse({ username, email, password });

    if (!result.success) {
      const errorMessages = result.error.format();
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    await register(username, email, password);
    navigate('/login');
  };

  return (
    <div className="md:container md:mx-auto flex flex-col m-28">
      <h1 className="pb-3 text-center">Register</h1>
      <div className="pb-4">
        <input
          className="w-full pt-2 pb-2 pl-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="text-red-500">{errors.username._errors[0]}</p>}
      </div>
      <div className="pb-4">
        <input
          className="w-full pt-2 pb-2 pl-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email._errors[0]}</p>}
      </div>
      <div className="pb-4">
        <input
          className="w-full pt-2 pb-2 pl-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500">{errors.password._errors[0]}</p>}
      </div>
      <div className="pb-4">
        <button className="w-full" onClick={handleRegister}>Register</button>
      </div>
      <a href="/login">Login</a>
    </div>
  );
};

export default RegisterPage;
