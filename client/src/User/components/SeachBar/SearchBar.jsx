import { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ setFilterList, filterList, setCount, count }) => {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchWord(searchTerm);
    const filteredList = filterList.filter(
      (item) =>
        item?.category_id?.category_name?.toLowerCase().includes(searchTerm)
    );
    setFilterList(filteredList);
  
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchWord}
        onChange={handleSearch}
      />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
