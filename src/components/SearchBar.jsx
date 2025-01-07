export default function SearchBar({ query, setQuery }) {
  function handleClick() {
    setQuery("");
  }
  console.log(query);
  return (
    <div className="flex items-center bg-gray-800 p-2 rounded-lg shadow-lg">
      <input
        className="border-none p-2 text-base rounded-l-lg w-72 transition-all duration-300 text-gray-200 bg-gray-900 placeholder-gray-500 focus:outline-none focus:shadow-lg"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-all duration-300"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}
