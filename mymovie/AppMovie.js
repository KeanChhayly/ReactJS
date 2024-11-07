import React, { createContext, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AutoSlider from "./AutoSlider";
import { tempMovieData } from "./tempMovieData";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Select = createContext(); // Moved outside the component

const AppMovie = () => {
  const [query, setQuery] = useState("");
  const [movies] = useState(tempMovieData);
  const [category, setCategory] = useState("New Movie");
  const [selectedItem, setSelectedItem] = useState(null);
  const [book, setBook] = useState(false);
  const [bookItem, setBookItem] = useState([]);
  const [toggle, setToggle] = useState(false);
  const filterItem = movies.filter((m) =>
    m.Title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelected = (ID) => {
    const selected = filterItem.find((fm) => fm.imdbID === ID);
    setSelectedItem(selected);
  };

  return (
    <>
      <Navbar movies={movies}>
        <Logo />
        {/* <CountMovie movies={movies} /> */}
        <BookMark
          book={book}
          setBook={setBook}
          bookItem={bookItem}
          setToggle={setToggle}
          toggle={toggle}
        />
      </Navbar>
      {toggle ? (
        <Result
          bookItem={bookItem}
          setBookItem={setBookItem}
          setToggle={setToggle}
        />
      ) : (
        ""
      )}

      <SLide>{selectedItem ? "" : <AutoSlider />} </SLide>
      {selectedItem ? (
        // Render nothing or some selected item view if selectedItem is truthy
        ""
      ) : (
        // Render Item and Search components if no item is selected
        <>
          <Item setCategory={setCategory} />
          <Search query={query} setQuery={setQuery} />
        </>
      )}
      {selectedItem ? (
        <SelectedCom
          bookItem={bookItem}
          setBookItem={setBookItem}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          book={book}
          setBook={setBook}
        />
      ) : (
        <Select.Provider value={handleSelected}>
          <MovieList
            category={category}
            movies={movies}
            filterItem={filterItem}
          />
        </Select.Provider>
      )}
    </>
  );
};

function Search({ query, setQuery }) {
  return (
    <div className="w-100 p-3 d-flex justify-content-end position-relative col-12 col-md-6 col-sm-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-4 w-100 fs-4 ps-5 bg-dark"
        placeholder="Search for movie title"
        style={{
          border: "none",
          outline: "none",
          borderRadius: "3px",
          color: "#fff",
        }}
      />
      <i
        className="fas fa-search position-absolute"
        style={{
          top: "50%",
          right: "5rem",
          transform: "translateY(-50%)",
          color: "#fff",
          fontSize: "1.8rem",
        }}
      ></i>
    </div>
  );
}

function Navbar({ children, movies }) {
  return (
    <div className="container-fluid fix">
      <div className="nav p-3">{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <div className="d-flex justify-content-start align-items-center ">
      <i className="bi bi-film fs-3 pe-2 text-dark"></i>
      <h1 className="ps-2 text-dark fw-bold fs-1">
        Movie <span className="text-danger fw-bolder">Today</span>
      </h1>
    </div>
  );
}

function BookMark({ book, bookItem, setBook, toggle, setToggle }) {
  function handleBook() {
    setToggle((t) => !t);
  }
  return (
    <div className="d-flex justify-content-end align-items-center fs-1">
      {book ? (
        <>
          <p className="me-5 text-dark fs-3">BookMark</p>
          <div className="Icon">
            <i className="bi bi-bookmark-fill" onClick={handleBook}></i>
            <p>{bookItem.length}</p>
          </div>
        </>
      ) : (
        <>
          <div className="Icon">
            <i className="bi bi-bookmark"></i>
            <p>{bookItem.length}</p>
          </div>
        </>
      )}
    </div>
  );
}

function Result({ bookItem, setBookItem, setToggle }) {
  function handleDelete(imdbID) {
    const del = bookItem.filter((book) => book.imdbID !== imdbID);
    alert("Movie have been deleted!");
    setBookItem(del);
  }

  if (bookItem.length <= 0) {
    setToggle(false);
  }
  return (
    <div className="bg-dark result__container container ">
      <div className="close" onClick={() => setToggle(false)}>
        <button
          type="button"
          class="btn-close mt-3 bg-light"
          disabled
          aria-label="Close"
        ></button>
      </div>
      <h1 className="mt-2 text-center fw-bold">BookList</h1>
      <div className="row text-center mt-5">
        <ul>
          {bookItem.map((book) => (
            <li key={book.imdbID} className="result__list">
              <img src={book.Poster} alt={book.Title} />
              <p className="fs-2">{book.Title}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(book.imdbID)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>

        {/* <div className="img__container col-lg-6 bg-warning">
          
        </div>
        <div className="action__container col-lg-6 bg-danger">2</div> */}
      </div>
    </div>
  );
}

function SLide({ children }) {
  return (
    <div style={{ marginTop: "7rem", borderRadius: "20px" }}>{children}</div>
  );
}

function Item({ setCategory }) {
  // State to keep track of the active category
  const [activeCategory, setActiveCategory] = useState("");

  const handleClick = (e, category) => {
    e.preventDefault(); // Prevents page reload
    setCategory(category); // Sets the category state in the parent
    setActiveCategory(category); // Updates the active category for styling
  };

  return (
    <div className="items py-5 w-75 mx-auto">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <ul className="menu__content list-unstyled d-flex flex-wrap justify-content-center gap-5">
            {["New Movie", "Up Coming", "Most Popular", "Local Movie"].map(
              (category) => (
                <li
                  key={category}
                  className="menu__list "
                  onClick={(e) => handleClick(e, category)}
                  style={{
                    color: activeCategory === category ? "#fff" : "black",
                    borderBottom:
                      activeCategory === category ? "3px solid #fff" : "none", // Colored underline
                    paddingBottom: "5px", // Adds spacing for the underline
                    margin: "0 10px", // Space between items
                  }}
                >
                  <a
                    href="/"
                    className="text-decoration-none"
                    style={{
                      color: activeCategory === category ? "#fff" : "#cecece",
                    }}
                  >
                    {category}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MovieList({ category, movies, filterItem }) {
  switch (category) {
    case "New Movie":
      return <NewMovies key={movies.imdbID} movies={filterItem} />;
    case "Up Coming":
      return <UpcomingMovies key={movies.imdbID} movies={filterItem} />;
    case "Most Popular":
      return <PopularMovies key={movies.imdbID} movies={filterItem} />;
    case "Local Movie":
      return <LocalMovies key={movies.imdbID} movies={filterItem} />;
    default:
      return null;
  }
}

function NewMovies({ movies }) {
  const filteredMovies = movies.filter((movie) =>
    movie.type.includes("new movie")
  );
  return <Menu movies={filteredMovies} />;
}

function UpcomingMovies({ movies }) {
  const filteredMovies = movies.filter((movie) =>
    movie.type.includes("up coming")
  );
  return <Menu movies={filteredMovies} />;
}

function PopularMovies({ movies }) {
  const filteredMovies = movies.filter((movie) =>
    movie.type.includes("most popular")
  );
  return <Menu movies={filteredMovies} />;
}

function LocalMovies({ movies }) {
  const filteredMovies = movies.filter((movie) =>
    movie.type.includes("Local movie")
  );
  return <Menu movies={filteredMovies} />;
}

function Menu({ movies }) {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(10); // Initial number of movies to show

  const handleSeeMore = () => {
    setVisibleMoviesCount((prevCount) => prevCount + 6); // Increase count by 6 each time
  };

  return (
    <div className="row ms-auto me-auto d-flex justify-content-center mt-5">
      {movies.slice(0, visibleMoviesCount).map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
      {visibleMoviesCount < movies.length && (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary pe-5 ps-5 pt-3 pb-3 mt-5"
            onClick={handleSeeMore}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}

function Movie({ movie }) {
  const update = useContext(Select);
  return (
    <div className="col-5 col-md-3 col-lg-2 mb-3 ms-3 me-3 hover border border-dark">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="img-fluid"
        style={{ width: "100%", height: "auto" }}
      />
      <h1 className="fw-bold fs-1 text-white">{movie.Title}</h1>
      <p className="fs-3">{movie.Year}</p>
      <div className="btn__container d-flex justify-content-end m-3">
        <button
          onClick={() => update(movie.imdbID)}
          className="btn btn-danger p-2 ps-4 pe-4 fs-5"
        >
          Watch
        </button>
      </div>
    </div>
  );
}

function SelectedCom({
  setSelectedItem,
  selectedItem,
  book,
  setBook,
  bookItem,
  setBookItem,
}) {
  function handleBook(imdbID) {
    // Check if the item with the same imdbID is already in bookItem
    const isAlreadyBooked = bookItem.some((curB) => curB.imdbID === imdbID);

    if (!isAlreadyBooked) {
      // Add selectedItem to bookItem if it doesn’t already exist
      setBookItem((book) => [...book, selectedItem]);
      alert(`Booked: ${selectedItem.Title}`);
    } else {
      alert(`${selectedItem.Title} is already booked.`);
    }
  }

  if (bookItem.length > 0) {
    setBook(true);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="py-5 col-lg-6 col-md-8 col-12 justify-content-center d-flex custom-height gap-3">
          <div className="img__container col-lg-6 col-md-6 col-sm-6 col-6">
            {" "}
            <img
              src={selectedItem.Poster}
              alt={selectedItem.Title}
              className="img-fluid w-100 h-100"
            />
          </div>
          <div className="des__container  col-lg-6 col-md-6 col-sm-6 col-6 pe-2 ps-2 ">
            <div className="py-3 text-center">
              <h1>{selectedItem.Title}</h1>
              <p className=" fs-4 text-start  ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto,
                enim dolores. Obcaecati vel eius repellat quas, recusandae
                soluta cumque inventore autem velit temporibus architecto
                adipisci illum{" "}
                <span className=" d-none d-sm-block">
                  quidem consequuntur eaque cum fugit aliquid incidunt. Ab
                  laborum aut sapiente, natus ipsam assumenda!
                </span>
              </p>
            </div>

            <div className="d-flex justify-content-center align-items-center  ">
              {" "}
              <button
                onClick={() => setSelectedItem(null)}
                className="btn btn-warning d-flex justify-content-between align-items-center"
              >
                Back
              </button>
              <button
                className="btn btn-danger m-3"
                onClick={() => handleBook(selectedItem.imdbID)}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppMovie;
