import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import SortPopup, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, status, totalPages } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzaItems = items.map((pizza: any) => (
      <PizzaBlock {...pizza} />
  ))

  const onChangeCategory = (id: number) => dispatch(setCategoryId(id));

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));


  async function getPizzas() {
    const sortBy = sort.sortProperty;
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&title=*${searchValue}` : '';

    dispatch(
      fetchPizzas({
        currentPage,
        category,
        search,
        sortBy
      })
    );
    window.scrollTo(0, 0);
  }

  // Pass parameters to url, only if it wasn't first render
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     }

  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     navigate(`?${ queryString }`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // When was first render, check url parameters and safe in redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({
  //       categoryId: Number(params.category),
  //       searchValue: params.search,
  //       currentPage: params.currentPage,
  //       sort: sort || sortList[0],
  //     }));
  
  //     isMounted.current = true;
  //   }
  // }, []);
  
  // Fetch data from backend. Checking on the first render, if we have params, don't fetch
  React.useEffect(() => {
      getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categoryId} 
          onChangeCategory={onChangeCategory} 
        />
        <SortPopup />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Something went wrong 😕</h2>
          <p>Can't load pizzas. Please, try again later.</p>
        </div>
      )
      : (      
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzaItems}
        </div>
      )}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setCurrentPage={onChangePage} 
      />
    </div>
  );
}

export default Home;
