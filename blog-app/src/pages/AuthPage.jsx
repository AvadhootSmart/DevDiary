import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#231e1d]">
      <div className="bg-transparent lg:p-8 sm:p-4 rounded-lg shadow-lg lg:w-96 sm:w-80 border-2 border-[#b8b4b0]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#b8b4b0]">
          {isLogin ? "Login" : "Register"}
        </h2>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin
              ? "New Here? Create an Account"
              : "Have an Account?, Login instead"}
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
      const response = await axios.post(`${backendURL}/login`, {
        username,
        password,
      });
      if (response.status == 200) {
        login(response.data);
        navigateTo("/");
      }
    } catch (error) {
      toast.error("Username or Password maybe incorrect, try again");
      console.error("Login failed", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <label className="block text-[#b8b4b0]">Username</label>
        <input
          type="text"
          className="w-full bg-transparent p-2 text-[#b8b4b0] border border-gray-300 rounded mt-1"
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-[#b8b4b0]">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 bg-transparent text-[#b8b4b0] rounded mt-1"
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
  const navigateTo = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    setusername("");
    setpassword("");
    try {
      const response = await axios.post(`${backendURL}/register`, {
        username,
        password,
      });

      if (response.status === 200) {
        login(response.data);
        navigateTo("/");
      } else if (response.status === 201) {
        toast.error("Username already exists, please login instead");
      }
    } catch (error) {
      toast.error("Registration failed, Please try again later");
      console.error("Registration failed", error);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      <div>
        <label className="block text-[#b8b4b0]">Username</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 bg-transparent text-[#b8b4b0] rounded mt-1"
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-[#b8b4b0]">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-[#b8b4b0]"
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
