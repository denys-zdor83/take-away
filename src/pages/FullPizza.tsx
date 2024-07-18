import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number
  }>();
  const { title, imageUrl, price } = pizza || {};

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://c988e3cd7ecb047d.mokky.dev/pizzas/${id}`)
        setPizza(data);
      } catch (error) {
        console.log('Error fetching pizza', error);
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <img src={imageUrl} alt="" />
      <h2>{title}</h2>
      <h4>{price} $</h4>
    </div>
  )
}

export default FullPizza;