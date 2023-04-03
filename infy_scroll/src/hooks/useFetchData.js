import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const useFetchData = (query, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      let response;
      if (query) {
        response = await axios.get(
          `https://openlibrary.org/search.json?q=${query}&page=${page}`
        );
        await setList((prev) => [
          ...new Set([...prev, ...response.data.docs.map((d) => d.title)]),
        ]);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [query, page]);

  useEffect(() => {
    fetchData(query);
  }, [page, query, fetchData]);

  return { loading, error, list };
};

export default useFetchData;
