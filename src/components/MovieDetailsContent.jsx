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
      <header className="flex flex-col md:flex-row md-items-center items-start mb-8">
        <img
          src={poster}
          alt={`${title} poster`}
          className="md:w-1/3 w-full rounded-lg shadow-lg object-cover mb-4 md:mb-0"
        />
        <div className="ml-8 flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-base md:text-lg">Released: {year}</p>
          <p className="text-gray-400 text-base md:text-lg">
            Duration: {runtime}
          </p>
          <p className="text-gray-400 text-base md:text-lg">
            Release Date: {released}
          </p>
          <p className="text-gray-400 text-lg">Actors: {actors}</p>
          <div className="flex gap-2">
            <p className="text-gray-400 text-lg">Rate movie: </p>
            <UserRating
              movieId={imdbID}
              maxRating={5}
              color="#fcc419"
              size={24}
              messages={["Terrible", "Bad", "Okay", "Good", "Great"]}
              defaultRating={0}
              onSetRating={(rating) =>
                console.log(`User rated ${rating} stars`)
              }
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-10">
            <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
            <p className="text-gray-400">{plot}</p>
          </div>
        </div>
      </header>
    </>
  );
}
