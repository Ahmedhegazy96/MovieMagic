import UserRating from "./UserRating";

export default function MovieDetailsContent({ movie }) {
  const {
    Title: title,
    Year: year,
    Runtime: runtime,

    Plot: plot,
    Released: released,
    Actors: actors,
    Poster: poster,
    imdbID,
  } = movie;

  return (
    <>
      <header className="flex items-center mb-8">
        <img
          src={poster}
          alt={`${title} poster`}
          className="w-1/3 rounded-lg shadow-lg"
        />
        <div className="ml-8">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 text-lg">Released: {year}</p>
          <p className="text-gray-400 text-lg">Duration: {runtime}</p>
          <p className="text-gray-400 text-lg">Release Date: {released}</p>
          <UserRating
            movieId={imdbID}
            maxRating={5}
            color="#fcc419"
            size={24}
            messages={["Terrible", "Bad", "Okay", "Good", "Great"]}
            defaultRating={0}
            onSetRating={(rating) => console.log(`User rated ${rating} stars`)}
          />
          <p className="text-gray-400 text-lg">Actors: {actors}</p>
        </div>
      </header>
      <section className="flex flex-col gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
          <p className="text-gray-400">{plot}</p>
        </div>
      </section>
    </>
  );
}
