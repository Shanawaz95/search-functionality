import React, { useEffect, useState } from "react";
import FetchData from "../FetchData";
import "./SearchResult.css";
import "bootstrap/dist/css/bootstrap.css";

function SearchResult({ query }) {
  const { data, isLoading, error } = FetchData(query);
  const resultsPerPage = 5;
  const [resultToRender, setResultToRender] = useState([]);
  const [nextSet, setNextSet] = useState(5);
  const [PageCount, setPageCount] = useState(0);

  function sliceOperation(start, end) {
    const slicedData = data ? data.slice(start, end) : [];
    setResultToRender(slicedData);
  }

  function totalPageCount(total, perPage) {
    const isDivsible = total % perPage === 0;
    const toAdd = isDivsible ? 0 : 1;
    return Math.floor(total / perPage) + toAdd;
  }

  useEffect(() => {
    sliceOperation(0, resultsPerPage);
    data && setPageCount(totalPageCount(data.length, resultsPerPage));
    setNextSet(5);
  }, [data]);

  function loadMoreClick() {
    sliceOperation(nextSet, nextSet + resultsPerPage);
    setNextSet((nextSet) => nextSet + resultsPerPage);
    setPageCount((PageCount) => PageCount - 1);
  }

  function conditionalRender() {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border"></div>
        </div>
      );
    } else if (data && data.length == 0) {
      return <p className="d-flex justify-content-center">No match found</p>;
    } else if (!isLoading && data) {
      return (
        <div className="container">
          <div className="row row-cols-sm-1 row-cols-md-3 justify-content-md-center">
            {resultToRender.map((val, id) => {
              return (
                <div className="col" key={`d-${id}`}>
                  <div className="card">
                    <h5 className="card-title" style={{ padding: "20px" }}>
                      {val["1. symbol"]}
                    </h5>
                    <p
                      className="card-text"
                      style={{ padding: "10px" }}
                      key={`p-${id}`}
                    >
                      {val["2. name"]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-end m-auto load-wrapper">
            {PageCount !== 1 ? (
              <div className="d-flex flex-column justify-content-center">
                <button onClick={() => loadMoreClick()}>Load more</button>
                <div className="arrow"></div>
              </div>
            ) : (
              <small>End of result</small>
            )}
          </div>
        </div>
      );
    } else if (!isLoading && !data) {
      return (
        <div className="d-flex flex-column">
          <p
            className="d-flex justify-content-center"
            style={{ margin: "0", padding: "0" }}
          >
            Type at least 3 characters
          </p>
          <small
            className="d-flex justify-content-center"
            style={{ margin: "0", padding: "0" }}
          >
            to start searching
          </small>
        </div>
      );
    }
  }

  return <div className="container">{conditionalRender()}</div>;
}

export default SearchResult;
