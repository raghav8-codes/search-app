import "./Pagination.css";

export default function Pagination({ page, pageCount, onPrev, onNext, onGo }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page <= 1}>Prev</button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onGo(p)}
          className={p === page ? "active" : ""}
          disabled={p === page}
        >
          {p}
        </button>
      ))}

      <button onClick={onNext} disabled={page >= pageCount}>Next</button>
    </div>
  );
}
