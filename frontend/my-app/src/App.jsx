import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import ResultsGrid from "./components/ResultsGrid";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import ErrorToast from "./components/ErrorToast";
import usePagination from "./hooks/usePagination";
import { fetchStoredResults, searchAndStore } from "./services/api";

export default function App() {
  const [query, setQuery] = useState("");
  const [rawResults, setRawResults] = useState([]); // full dataset (if client-side pagination)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // client-side pagination by default
  const perPage = 12;
  const { page, pageCount, current, next, prev, go } = usePagination(rawResults, perPage);

  const loadStored = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchStoredResults();  
      // backend sends: [ { keyword: "abc", data: [...] }, ... ]
      const items = Array.isArray(data) ? data.flatMap(d => d.data) : [];
      setRawResults(items);
      go(1);
    } catch (e) {
      setError("Unable to load stored results from the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await searchAndStore(query);  
      setRawResults(res.results || []);
      go(1); 
    } catch (e) {
      setError("Search failed. Check the backend API and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <SearchForm
          query={query}
          setQuery={setQuery}
          onSubmit={onSubmit}
          loading={loading}
        />

        {error && <ErrorToast message={error} onClose={() => setError("")} />}

        {loading ? (
          <Loader />
        ) : (
          <>
            <ResultsGrid items={current} />
            
            {/* ✅ only show pagination when there are results */}
            {rawResults.length > 0 && pageCount > 1 && (
              <Pagination
                page={page}
                pageCount={pageCount}
                onPrev={prev}
                onNext={next}
                onGo={go}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
