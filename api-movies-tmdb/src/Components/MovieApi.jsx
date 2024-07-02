import { useState } from "react";

function MovieApi() {
  const [resultApiData, setApiData] = useState([]);
  const fetchNowPlaying = async () => {
    const fetchData = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=5f80bbb3b3d0438a26119d1434df1e75"
    );
    if (!fetchData.ok) {
      throw new Error("Network Error was not Ok");
    }

    const jsonData = await fetchData.json();
    setApiData(jsonData.results);
  };

  const fetchPopular = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=5f80bbb3b3d0438a26119d1434df1e75"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Error was not Ok");
        }
        return response.json();
      })
      .then((responseData) => setApiData(responseData.results));
  };

  const fetchTopRated = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=5f80bbb3b3d0438a26119d1434df1e75"
    )
      .then((response) => response.json())
      .then((receivedData) => setApiData(receivedData.results));
  };
  const fetchUpcoming = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=5f80bbb3b3d0438a26119d1434df1e75"
    )
      .then((response) => response.json())
      .then((receivedData) => setApiData(receivedData.results));
  };

  console.log(resultApiData);
  return (
    <>
      {" "}
      <div className="flex justify-center ">
        <button
          className="p-3 border border-solid mb-3 mr-3"
          onClick={fetchNowPlaying}
        >
          Now Playing
        </button>
        <button
          className="p-3 border border-solid mb-3 mr-2"
          onClick={fetchPopular}
        >
          Popular{" "}
        </button>
        <button
          className="p-3 border border-solid mb-3 mr-2"
          onClick={fetchTopRated}
        >
          Top Rated{" "}
        </button>
        <button
          className="p-3 border border-solid mb-3 mr-2"
          onClick={fetchUpcoming}
        >
          upcoming{" "}
        </button>
      </div>
      <div className="bg-red-500 h-full w-full ">
        <div className="flex flex-wrap justify-center ">
          {resultApiData.map((movie) => (
            <div key={movie.id} className="h-96 w-64 p-6">
              <div className="bg-white max-h-fit ">
                <h1 className="text-gray-900 font-medium text-sm  p-2 text-start">
                  Title: {movie.title}
                </h1>
                <img
                  className="h-64 w-52 object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />{" "}
                <p>Releases On: {movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default MovieApi;
