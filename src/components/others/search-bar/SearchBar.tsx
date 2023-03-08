import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./s_searchBar";
import { useState } from "react";
import { isAlphabet } from "../../../utils/utilsFunctions";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchValue}
        onKeyDown={(e) => isAlphabet(e)}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
}
