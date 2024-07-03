import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();
  const { title, imageUrl, price } = pizza || {};

  useEffect(() => {
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

  return (
    <div className="container">
      <img src={imageUrl} alt="" />
      <h2>{title}</h2>
      <h4>{price} $</h4>
    </div>
  )
}

export default FullPizza;