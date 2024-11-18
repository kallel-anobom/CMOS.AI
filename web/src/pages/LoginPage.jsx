import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { AuthContext } from "../contexts/AuthContext";

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ username, password });

    if (!result.success) {
      const errorMessages = result.error.format();
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    
    const success = await login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setErrors({ general: "Login failed. Please check your credentials." });
    }
  };

  return (
    <div className="md:container md:mx-auto flex flex-col m-28">
      <h1 className="pb-3 text-center">Login</h1>
      <div className="pb-4">
        <input
          className="w-full pt-2 pb-2 pl-3"
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500">{errors.username._errors[0]}</p>
        )}
      </div>
      <div className="pb-4">
        <input
          className="w-full pt-2 pb-2 pl-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password._errors[0]}</p>
        )}
      </div>
      <div className="mb-2">
        <button className="w-full" onClick={handleLogin}>
          Login
        </button>
      </div>
      <a href="/register">Register</a>
    </div>
  );
};

export default LoginPage;
