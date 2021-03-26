import { useState, useEffect, useMemo } from "react";
import axios from "axios";

function FetchData(query) {
  const API_KEY = "GVVKTI1X5SSC7TLC";
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, error: "" });

  let cachememo = useMemo(() => {
    let cache = {};
    return cache;
  }, []);

  let cancelFetch = useMemo(() => {
    let cancel = "";
    return cancel;
  }, []);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      if (query.length >= 3 && cachememo[query]) {
        const data = cachememo[query];
        setData(data);
        setIsLoading(false);
      } else if (query.length >= 3 && !cachememo[query]) {
        if (cancelFetch) {
          cancelFetch.cancel();
        }
        cancelFetch = axios.CancelToken.source();
        setIsLoading(true);
        setTimeout(() => {
          axios.get(url, { cancelToken: cancelFetch.token }).then(
            (response) => {
              setData(response.data.bestMatches);
              cachememo[query] = response.data.bestMatches;
            },
            (error) => {
              setError({ isError: true, error: error });
            }
          );
        }, 500);
      } else {
        setData(null);
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => setIsLoading(false), [data]);

  return { data, isLoading, error };
}

export default FetchData;
