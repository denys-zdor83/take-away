import { useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index.jsx';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status, totalPages } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzaItems = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  async function getPizzas() {
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const search = searchValue ? `&title=*${searchValue}` : ''

    dispatch(
      fetchPizzas({
        currentPage,
        category,
        search,
        sort
      })
    );
    window.scrollTo(0, 0);
  }

  // Pass parameters to url, only if it wasn't first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${ queryString }`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // When was first render, check url parameters and safe in redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort,
      }));
  
      isSearch.current = true;
    }
  }, []);
  
  // Fetch data from backend. Checking on the first render, if we have params, don't fetch
  useEffect(() => {
      getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categoryId} 
          onChangeCategory={(id) => dispatch(setCategoryId(id))} 
        />
        <Sort />
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
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={onChangePage} />
    </div>
  );
}

export default Home;
