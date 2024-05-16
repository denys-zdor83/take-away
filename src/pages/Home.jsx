import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

function Home() {
  const dispatch = useDispatch();

  const {categoryId, sort} = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzaItems = pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)

  useEffect(() => {
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const search = searchValue ? `&title=*${searchValue}` : ''
    const fetchUrl = `https://c988e3cd7ecb047d.mokky.dev/pizzas?page=${currentPage}&limit=4${ category }&sortBy=${ sort.sortProperty }${ search }`

    setIsLoading(true);
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json.items);
        setTotalPages(json.meta.total_pages);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
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
      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Home;
