import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home({ searchValue }) {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'popularity (desc)',
    sortProperty: '-rating',
  });

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzaItems = pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)

  useEffect(() => {
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const search = searchValue ? `&title=*${searchValue}` : ''
    const fetchUrl = `https://c988e3cd7ecb047d.mokky.dev/pizzas?page=${currentPage}&limit=4${ category }&sortBy=${ sortType.sortProperty }${ search }`

    setIsLoading(true);
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json.items);
        setTotalPages(json.meta.total_pages);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categoryId} 
          onChangeCategory={setCategoryId} 
        />
        <Sort 
          value={sortType} 
          onChangeSort={setSortType} 
        />
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
