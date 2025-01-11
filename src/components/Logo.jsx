import { Link } from "react-router-dom";
import Box from "./Box";

export default function Logo({ className }) {
  return (
    <Link to="/" className="hover:no-underline">
      <Box
        className={`flex items-center space-x-2 p-2 bg-blue-700 border-2 border-blue-900 rounded-md shadow-lg transition-transform transform hover:scale-105 ${className}`}
      >
        <span role="img" className="text-2xl" aria-label="popcorn">
          🍿
        </span>
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          MovieMagic
        </span>
      </Box>
    </Link>
  );
}
