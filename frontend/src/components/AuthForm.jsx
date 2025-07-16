import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm({ type = "login", onSubmit }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const isLogin = type === "login";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="mb-4 w-full p-2 rounded bg-gray-700"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="mb-4 w-full p-2 rounded bg-gray-700"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 w-full p-2 rounded bg-gray-700"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-6 w-full p-2 rounded bg-gray-700"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {isLogin ? "Log In" : "Register"}
        </button>

        <div className="text-center mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-400 underline">
                Register here
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 underline">
                Log in instead
              </a>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
