import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

const shouldntUpdate = (prevProps, nextProps) => {
  return prevProps.pages === nextProps.pages;
};

export default React.memo(function Pager({ pages, setSkip }) {
  const setPage = (e, page) => {
    setSkip(page - 1);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  return (
    <div className="">
      <Pagination count={pages} onChange={setPage} color="primary" />
    </div>
  );
}, shouldntUpdate);
