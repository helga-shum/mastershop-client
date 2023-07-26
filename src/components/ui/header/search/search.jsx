import React from "react";
import styles from "./search.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../../store/filter";

const Search = () => {
  const dispatch=useDispatch();
  const [search, setSearch] = React.useState("")
  const handleSearch = (event) => {
    const value = event.target.value;
    console.log(value)
    setSearch(value);

    dispatch(setSearchValue(value))
  };
  return (

      <input
        className={styles.search}
        type="text"
        placeholder="Search..."
        name="search"
        value={search}
        onChange={handleSearch}
      />

  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  search: PropTypes.string,
};
export default Search;
