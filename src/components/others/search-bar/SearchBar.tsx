import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./s_searchBar";
import { useState, KeyboardEvent } from "react";
import { onlyAlphabet } from "../../../utils/utilsFunctions";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import { listStyle } from "./s_searchBar";

export default function SearchBar(props: Suggestions) {
  const { products, searchValue, setSearchValue, type } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);

  // useEffect(() => console.log(products, searchValue), [searchValue, products]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setTimeout(() => setSearchValue(""), 100);
  };

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
      {!!products && searchValue && (
        <List
          sx={listStyle}
          component="nav"
          aria-label="products suggestion list"
        >
          {products.length ? (
            products?.map(({ name, tag, id, gender }) => (
              <Link
                key={id}
                href="/products"
                style={{ all: "unset", display: "block" }}
              >
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemText
                    sx={{ textTransform: "capitalize" }}
                    primary={type ? `${tag} (${gender[0]})` : null}
                    secondary={name}
                  />
                </ListItemButton>
              </Link>
            ))
          ) : (
            <ListItemButton sx={{ textAlign: "center" }} disabled>
              <ListItemText primary="No Results" />
            </ListItemButton>
          )}
        </List>
      )}
    </Search>
  );
}

interface Suggestions {
  products?: { name: string; tag: string; id: string; gender: string }[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  type?: boolean;
}
