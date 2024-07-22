import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types';
import { setSort } from '../redux/filter/slice';

type PopupClickType = MouseEvent & {
  composedPath: () => Node[]
}

type SortPopupProps = {
  value: SortType;
}

export const sortList: SortType[] = [
  { name: 'popularity (desc)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'popularity (asc)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'price (desc)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'price (asc)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'alphabetically (desc)', sortProperty: SortPropertyEnum.TITLE_ASC },
  { name: 'alphabetically (asc)', sortProperty: SortPropertyEnum.TITLE_DESC },
];

export const Sort: React.FC<SortPopupProps> = React.memo(
  ({ value }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);
  
    const onClickSort = (obj: SortType) => {
      dispatch(setSort(obj));
      setIsOpen(false);
    };
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const _event = event as PopupClickType
        
        if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
          setIsOpen(false);
        }
      }
      document.body.addEventListener('click', handleClickOutside);
      return () => document.body.removeEventListener('click', handleClickOutside) 
    }, []);
  
    return (
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"></path>
          </svg>
          <b>Sort by:</b>
          <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
        </div>
        {isOpen && (
          <div className="sort__popup">
            <ul>
              {sortList.map((obj, idx) => (
                <li 
                  onClick={() => onClickSort(obj)} 
                  key={idx}
                  className={value.sortProperty === obj.sortProperty ? 'active' : ''}
                >
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
)
