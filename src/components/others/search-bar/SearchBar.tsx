import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./s_searchBar";
import { useState, KeyboardEvent } from "react";
import { onlyAlphabet } from "../../../utils/utilsFunctions";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const checkTypedKey = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!onlyAlphabet(e.key)) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchValue}
        onKeyDown={(e) => checkTypedKey(e)}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}
