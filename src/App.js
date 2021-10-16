import { useState } from "react";
import "./App.css";
import axios from "axios";
import Pagination from "./Pagination";

const URL =
  "https://api.giphy.com/v1/gifs/search?api_key=JEkYv0FwSbDnE1h9WC0y0pZ1TQarFWyH";
function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gifPerPage] = useState(9);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      handleSubmit();
    }
  }
    

  const handleSubmit = async (e) => {
    
    setLoading(true);
    const results = await axios(URL, {
      params: {
        q: search,
      },
    });

    setImages(results.data.data);
    setLoading(false);
    console.log(results.data.data);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h2 className="loading">{''}</h2>;
  }

  // get current posts
  const indexOfLastPost = currentPage * gifPerPage;
  const indexOfFirstPost = indexOfLastPost - gifPerPage;
  const currentPosts = images.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="title-container">
        <h1 className="text-capitalize title">giphy search</h1>
      </div>

      <div className="input-container">
        <input
          className=""
          type="text"
          placeholder="Search gif"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        <div>
          <button
            id="bouton"
            class="btn btn-outline-white btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>

      <div className="gif-container">
        {currentPosts.map((pic) => {
          return (
            <div className="gif-item">
              <div key={pic.id}>
                <h5>{pic.title}</h5>
                <img
                  src={pic.images.downsized_medium.url}
                  alt=""
                  className="img-gif"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className='pagination-container'>
        <Pagination
          gifPerPage={gifPerPage}
          totalImages={images.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default App;
