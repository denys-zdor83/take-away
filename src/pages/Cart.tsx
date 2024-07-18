import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartItemBlock from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';
import CartTitle from '../assets/img/cart-title.svg';
import Bucket from '../assets/img/bucket.svg';
import ArrowLeft from '../assets/img/arrow-left.svg';
import { selectCart } from '../redux/cart/selectors';
import { clearItems } from '../redux/cart/slice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);
  const totalItems = items.reduce((sum: number, item: any) => sum + item.count, 0)

  const onClickClear = () => {
    if (window.confirm('Clear cart?')) {
      dispatch(clearItems())
    }
  }

  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <img src={CartTitle} alt="Cart" />
            Cart
          </h2>
          <div 
            className="cart__clear" 
            onClick={onClickClear}
          >
            <img src={Bucket} alt="Bucket" />
            <span>Clear cart</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((obj: any) => (
            <CartItemBlock key={obj.id} {...obj} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {' '}
              Total: <b>{totalItems} pieces.</b>{' '}
            </span>
            <span>
              {' '}
              Sum: <b>{totalPrice} $</b>{' '}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <img src={ArrowLeft} alt="ArrowLeft" />

              <span>Back</span>
            </Link>
            <div className="button pay-btn">
              <span>Make an order</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
