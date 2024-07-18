import React from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import SortPopup from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import ErrorLoadingMsg from '../components/ErrorLoadingMsg';
import { useAppDispatch } from '../redux/store';
import { selectPizzasData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, totalPages } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzaItems = items.map((pizza: any) => (
      <PizzaBlock key={pizza.id} {...pizza} />
  ))
  
  const onChangeCategory = React.useCallback(
    (id: number) => dispatch(setCategoryId(id)), 
    []
  );

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
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">
        All pizzas
      </h2>
      {status === 'error' ? <ErrorLoadingMsg />
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
