export default function ErrorToast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="error">
      {message}
      {onClose && (
        <button
          style={{
            marginLeft: "10px",
            background: "transparent",
            border: "none",
            color: "#cc0000",
            cursor: "pointer"
          }}
          onClick={onClose}
        >
          ✖
        </button>
      )}
    </div>
  );
}
