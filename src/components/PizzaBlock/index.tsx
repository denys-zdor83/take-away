import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../../redux/cart/selectors';
import { CartItem } from '../../redux/cart/types';
import { addItem } from '../../redux/cart/slice';

type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl: image, sizes, types }) => {
  const doughTypes = ['thin', 'traditional'];
  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;
  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl: image,
      type: doughTypes[activeType],
      size: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item));
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`} key={id}>
          <img className="pizza-block__image" 
            src={image} 
            alt="Pizza" 
            height={260}
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li 
                onClick={() => setActiveType(type)} 
                key={type} 
                className={activeType === type ? 'active' : ''}>{doughTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, idx) => (
              <li 
                onClick={() => setActiveSize(idx)} 
                key={size} 
                className={activeSize === idx ? 'active' : ''}>{size} sm.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">From {price} $</div>
          <button 
            type="button" 
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="white"></path>
            </svg>
            <span>Add</span>
            { addedCount > 0 && <i>{addedCount}</i> }
          </button>
        </div>
      </div> 
    </div>
  )
}
