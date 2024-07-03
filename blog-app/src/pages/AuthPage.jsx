import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const navigateTo = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/login`, {
        username,
        password,
      });
      if (response.status == 200) {
        login(response.data);
        navigateTo("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

const RegisterForm = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/register`, {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      <div>
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
};

export default AuthPage;