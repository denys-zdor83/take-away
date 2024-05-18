import { useContext, useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce'; 

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

import Lens from '../../assets/img/lens.svg';
import Close from '../../assets/img/cross.svg';

function Search() {
  const [ value, setValue ] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef()

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    [],
  );

  const onChangeInput = (event) => {
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
