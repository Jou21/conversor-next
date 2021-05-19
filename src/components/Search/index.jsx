import React from "react";
import styles from "./Search.module.css";

const Search = ({ ...rest }) => {
  return (
    <div className={styles.coin_search}>
      <input className={styles.coin_input} {...rest} />
    </div>
  );
};

export default Search;
