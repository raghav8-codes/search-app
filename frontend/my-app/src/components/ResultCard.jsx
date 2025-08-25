export default function ResultCard({ item }) {
  const title = item.full_name || item.name || "Untitled";
  const desc = item.description || "No description available.";
  const link = item.html_url || item.url || "#";

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <a href={link} target="_blank" rel="noreferrer">
        View Details →
      </a>
    </div>
  );
}
