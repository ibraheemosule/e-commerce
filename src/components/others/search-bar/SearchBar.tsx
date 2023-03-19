import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./s_searchBar";
import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { onlyAlphabet } from "../../../utils/utilsFunctions";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import { listStyle } from "./s_searchBar";
import { useRouter } from "next/router";

export default function SearchBar(props: Suggestions) {
  const { products, searchValue, setSearchValue, type } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    products && setSearchValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

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
    <Search
      onBlur={(e) => {
        const elAttr = e.relatedTarget?.getAttribute("data-list");
        if (elAttr) return;
        products && setSearchValue("");
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchValue}
        onKeyDown={(e) => checkTypedKey(e)}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        ref={input}
      />
      {!!products && searchValue && (
        <List
          sx={listStyle}
          component="nav"
          aria-label="products suggestion list"
        >
          {products.length ? (
            products?.map(({ name, tag, id, gender }, i) => (
              <Link
                key={id}
                href={`/product?id=${id}`}
                style={{ all: "unset", display: "block" }}
              >
                <ListItemButton
                  ref={list}
                  data-list="listed"
                  selected={selectedIndex === i}
                  onClick={(event) => handleListItemClick(event, i)}
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
