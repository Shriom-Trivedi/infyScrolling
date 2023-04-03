import { useCallback, useEffect, useRef, useState } from "react";
import useFetchData from "./hooks/useFetchData";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const endTarget = useRef(null);

  const { loading, error, list } = useFetchData(query, page);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (endTarget.current) observer.observe(endTarget.current);
  }, [handleObserver]);
  return (
    <div className="App">
      <h1>BookSpace</h1>
      <input type="text" value={query} onChange={handleChange} />
      <div>
        {list.map((book, i) => (
          <div key={i}>{book}</div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className=" text-red-500">Something went wrong!</p>}
      <div ref={endTarget} />
    </div>
  );
}

export default App;
