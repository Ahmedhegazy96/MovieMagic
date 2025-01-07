export default function Logo() {
  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse h-8">
      <span role="img" className="text-2xl" aria-label="popcorn">
        🍿
      </span>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        MovieMagic
      </span>
    </div>
  );
}
