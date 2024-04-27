import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://c988e3cd7ecb047d.mokky.dev/pizzas')
      .then((response) => response.json())
      .then((json) => {
        setPizzas(json)
        setIsLoading(false)
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
          : pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </>
  );
}

export default Home;
