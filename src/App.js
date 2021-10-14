import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const URL =
  "https://api.giphy.com/v1/gifs/search?api_key=JEkYv0FwSbDnE1h9WC0y0pZ1TQarFWyH";
function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await axios(URL, {
      params: {
        q: search,
      },
    });
    setImages(results.data.data);
    console.log(results.data.data);
  };

  return (
    <>
      <div className="input-group mb-3 custom-div">
        <input
          className='form-control custom-input'
          type="text"
          placeholder="Search gif"
          value={search}
          onChange={handleSearchChange}
        />
        <div>
          <button
            class="btn btn-outline-white btn-success"
            type="button"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        {images.map((pic) => {
          return (
            <div className="box-border h-50 w-50 p-4 border-4">
              <div key={pic.id}>
                <h5>{pic.title}</h5>
                <img src={pic.images.downsized_medium.url} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
