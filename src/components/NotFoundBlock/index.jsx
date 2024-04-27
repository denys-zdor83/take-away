import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.not_found}>
      <h1>
        <span>😕</span>
        <br />
        Nothing was found
      </h1>
      <p className={styles.description}>Unfortunatelly this page is absent</p>
    </div>
  );
}

export default NotFoundBlock;
