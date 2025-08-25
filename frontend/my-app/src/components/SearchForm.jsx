export default function SearchForm({ query, setQuery, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter keyword (e.g., react)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={!query || loading}>
        {loading ? "Searching…" : "Search & Save"}
      </button>
    </form>
  );
}
