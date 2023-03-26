import {
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { paginateFunction } from "../../../utils/utilsFunctions";

import {
  setPaginatedList,
  setLastPaginatedNumber,
} from "../../../store/features/product/product-slice";
import Grid from "@mui/material/Grid";
import s from "./s_pagination.module.css";
import { ProductType } from "../../../utils/ts-types/__store/typesProduct";
export interface IPaginationProps {
  number: number;
  numOfPages: number;
  setNumber: Dispatch<SetStateAction<number>>;
}
const paginateBy = 3;

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const { products, lastPaginatedNumber } = useAppSelector(
    (state) => state.product
  );
  // const [number, setNumber] = useState(lastPaginatedNumber);
  const [pageNumberInput, setPageNumberInput] =
    useState<number>(lastPaginatedNumber);
  const numOfPages = Math.ceil(products.length / paginateBy);

  useEffect(() => {
    setPageNumberInput(lastPaginatedNumber);
  }, [lastPaginatedNumber]);

  useEffect(() => {
    const paginatedArray = paginateFunction({
      arr: [...products],
      pageSize: paginateBy,
      pageNumber: lastPaginatedNumber,
    }) as unknown as ProductType[];

    dispatch(setPaginatedList([...paginatedArray]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, lastPaginatedNumber]);

  const increment = () => {
    if (lastPaginatedNumber < numOfPages)
      dispatch(setLastPaginatedNumber(lastPaginatedNumber + 1));
  };

  const decrement = () => {
    if (lastPaginatedNumber > 1)
      dispatch(setLastPaginatedNumber(lastPaginatedNumber - 1));
  };

  const changeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFieldValue = e.target.value.trim();
    const newPaginationNumber = Number(inputFieldValue);

    if (Number.isNaN(newPaginationNumber) || newPaginationNumber > numOfPages)
      return;

    if (newPaginationNumber === 0) {
      setPageNumberInput(inputFieldValue === "" ? +inputFieldValue : 0);
      return;
    }
    dispatch(setLastPaginatedNumber(newPaginationNumber));
    setPageNumberInput(newPaginationNumber);
  };

  const goToFirstOrLast = (number: number) => {
    dispatch(setLastPaginatedNumber(Number(number)));
  };

  const updatePaginationToOneOnBlur = () => {
    if (pageNumberInput === 0) {
      setPageNumberInput(1);
      dispatch(setLastPaginatedNumber(1));
    }
  };

  return (
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <ul className={s.pagination}>
        <li>
          <button
            disabled={lastPaginatedNumber === 1}
            onClick={() => goToFirstOrLast(1)}
            className={s.prev}
          >
            1
          </button>
        </li>
        <li>
          <button onClick={decrement} disabled={lastPaginatedNumber === 1}>
            {lastPaginatedNumber - 1 || ""}
          </button>
        </li>
        <li>
          <input
            onBlur={updatePaginationToOneOnBlur}
            type="text"
            value={pageNumberInput}
            pattern="[0-9]+"
            inputMode="numeric"
            onChange={(e) => changeNumber(e)}
          />
        </li>
        <li>
          <button
            onClick={increment}
            disabled={lastPaginatedNumber === numOfPages}
          >
            {lastPaginatedNumber + 1 <= numOfPages
              ? lastPaginatedNumber + 1
              : ""}
          </button>
        </li>
        <li>
          <button
            disabled={lastPaginatedNumber === numOfPages}
            onClick={() => goToFirstOrLast(numOfPages)}
            className={s.next}
          >
            {numOfPages}
          </button>
        </li>
      </ul>
    </Grid>
  );
};

export default Pagination;
