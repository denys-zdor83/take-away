import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}
export const Pagination: React.FC<PaginationProps> = ({
  setCurrentPage, 
  currentPage, 
  totalPages
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageCount={totalPages}
      previousLabel="<"
      forcePage={currentPage - 1}
    />
  )
}