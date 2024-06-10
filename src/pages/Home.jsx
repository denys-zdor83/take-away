import { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const [ pizzas, setPizzas ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  // const [currentPage, setCurrentPage] = useState(0);
  const [ totalPages, setTotalPages ] = useState(0);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzaItems = pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  function fetchPizzas() {
    setIsLoading(true);
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const search = searchValue ? `&title=*${searchValue}` : ''
    const fetchUrl = `https://c988e3cd7ecb047d.mokky.dev/pizzas?page=${currentPage}&limit=4${ category }&sortBy=${ sort.sortProperty }${ search }`

    axios.get(fetchUrl)
      .then((response) => {
        setPizzas(response.data.items);
        setTotalPages(response.data.meta.total_pages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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
      <div className="content__items">
        {isLoading ? skeletons : pizzaItems}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={onChangePage} />
    </div>
  );
}

export default Home;
