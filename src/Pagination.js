import React from "react";

function Pagination({ gifPerPage, totalImages, paginate }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalImages / gifPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination justify-content-center paginate-1">
        {pageNumber.map((number) => (
          <li key={number} className="page-item ">
            <a onClick={() => paginate(number)} className="page-link" href='#'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
