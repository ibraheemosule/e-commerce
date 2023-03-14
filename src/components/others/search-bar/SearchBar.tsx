import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./s_searchBar";
import { useState, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { onlyAlphabet } from "../../../utils/utilsFunctions";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

export default function SearchBar(props: Suggestions) {
  const { products, searchValue, setSearchValue, type } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);

  // useEffect(() => console.log(products, searchValue), [searchValue, products]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
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
          sx={{
            zIndex: 2,
            backgroundColor: "primary.light",
            color: "primary.dark",
            borderRadius: 1,
            position: "absolute",
            maxHeight: "150px",
            overflowY: "scroll",
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            boxShadow: "2px 5px 46px -14px rgba(0,0,0,1)",
            "-webkit-box-shadow": "2px 5px 46px -14px rgba(0,0,0,1)",
            "-moz-box-shadow": "2px 5px 46px -14px rgba(0,0,0,1)",
            ".css-fbv8zl-MuiTypography-root": {
              color: "primary.dark",
            },
            top: "130%",
            width: "100%",
            left: "0%",
          }}
          component="nav"
          aria-label="products suggestion list"
        >
          {products.length ? (
            products?.map(({ name, tag }) => (
              <ListItemButton
                key={name}
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={type ? tag : null}
                  secondary={name}
                />
              </ListItemButton>
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
  products?: { name: string; tag: string; [key: string]: unknown }[];
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  type?: boolean;
}
