import ResultCard from "./ResultCard";
import EmptyState from "./EmptyState";

export default function ResultsGrid({ items = [] }) {
  if (!items.length) return <EmptyState />;

  return (
    <div className="grid">
      {items.map((item, idx) => (
        <ResultCard key={item.id || idx} item={item} />
      ))}
    </div>
  );
}
