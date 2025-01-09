import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl">404 - Page Not Found</h1>
      <Link to="/" className="mt-4 text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
};
export default NotFound;
