import React from "react"
import propTypes from "prop-types"
import _ from "lodash"

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  //Nine movies of itemsCount

  console.log(currentPage)

  const pagesCount = Math.ceil(itemsCount / pageSize)
  const pages = _.range(1, pagesCount + 1)

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
}

export default Pagination
