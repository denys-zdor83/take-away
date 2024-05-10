import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({setCurrentPage, totalPages}) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination