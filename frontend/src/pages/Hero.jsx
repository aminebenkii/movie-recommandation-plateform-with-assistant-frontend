import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to MoviesYouDidntWatch.com</h1>
      <p className="mb-6 text-lg">Find your next favorite movie today</p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 px-4 py-2 rounded">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Hero;
