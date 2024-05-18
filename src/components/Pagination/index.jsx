import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({setCurrentPage, currentPage, totalPages}) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageCount={totalPages}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination