import React from 'react';
import debounce from 'lodash.debounce'; 

import styles from './Search.module.scss';

import Lens from '../../assets/img/lens.svg';
import Close from '../../assets/img/cross.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [ value, setValue ] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.lens} src={Lens} alt="lens" />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.close}
          src={Close}
          alt="close"
        />
      )}
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
