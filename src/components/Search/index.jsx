import { useContext } from 'react';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

import Lens from '../../assets/img/lens.svg';
import Close from '../../assets/img/cross.svg';

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <img className={styles.lens} src={Lens} alt="lens" />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className={styles.close}
          src={Close}
          alt="close"
        />
      )}
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
