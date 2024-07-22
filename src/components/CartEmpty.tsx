import React from 'react';
import { Link } from 'react-router-dom';
import cartEmpty from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty 😕</h2>
      <p>
        Most likely, you haven't ordered pizza yet.<br/>
        To order pizza, go to the main page.
      </p>
      <img src={cartEmpty} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Return</span>
      </Link>
    </div>
  )
}