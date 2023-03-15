import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ProductCard from "../../others/product-card/ProductCard";
import SelectField from "../../others/select-field/SelectField";
import SearchBar from "../../others/search-bar/SearchBar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { memo } from "react";
import { mutateProductsList } from "../../../store/features/product/product-slice";
import Grid from "@mui/material/Grid";

const sortOptions = ["a-z", "z-a", "highest price", "lowest price"];
const genderOptions = ["male", "female", "unisex"];

const Products = () => {
  const dispatch = useAppDispatch();
  const { searchValue, products, filterValue, sortValue, genderValue } =
    useAppSelector((state) => state.product);

  const updateSearch = (value: string) =>
    void dispatch(mutateProductsList({ searchValue: value }));

  const updateFilter = (value: string) =>
    void dispatch(mutateProductsList({ filterValue: value }));

  const updateSort = (value: string) =>
    void dispatch(mutateProductsList({ sortValue: value }));

  const updateGender = (value: string) =>
    void dispatch(mutateProductsList({ genderValue: value }));

  return (
    <Box py={{ xs: 9, sm: 12, lg: 15 }}>
      <Container>
        <Grid container maxWidth="lg" bgcolor="primary.light" py={6}>
          <Grid item xs={12}>
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                rowGap: 1,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  alignSelf: "flex-end",
                  justifySelf: "flex-start",

                  "& > div": {
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  },
                }}
              >
                <SearchBar
                  searchValue={searchValue}
                  setSearchValue={updateSearch}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 2, sm: 4, md: 2 },
                  mt: 2,
                  width: { xs: "100%", md: "auto" },
                  flexWrap: "wrap",
                  justifyContent: { md: "space-between" },
                }}
              >
                <SelectField
                  selectValue={genderValue}
                  setSelectValue={updateGender}
                  options={genderOptions}
                  title="Gender"
                />
                <SelectField
                  selectValue={filterValue}
                  setSelectValue={updateFilter}
                  options={["bags", "shoes", "belts"]}
                  title="Filter By"
                />
                <SelectField
                  selectValue={sortValue}
                  setSelectValue={updateSort}
                  options={sortOptions}
                  title="Sort By"
                />
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} mt={6}>
            <Grid container justifyContent="center" gap={5}>
              {products.map((product, i) => (
                <Grid item xs={10} sm={5} md={3.5} key={i}>
                  <ProductCard
                    img={product.images[0]}
                    path="/products"
                    product={product}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(Products);
