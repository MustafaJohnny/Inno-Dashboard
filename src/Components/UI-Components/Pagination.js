import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "./ModalStyle.module.css";
import { controlActions } from "../Redux/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
  const WaiterData = useSelector((state) => state.controler.user_waitor_data);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(WaiterData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(WaiterData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, WaiterData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % WaiterData.length;
    setItemOffset(newOffset);
  };

  return (
    <React.Fragment>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </React.Fragment>
  );
};

export default Pagination;
