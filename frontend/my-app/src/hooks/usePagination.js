import { useMemo, useState, useEffect } from "react";

export default function usePagination(items = [], perPage = 12) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(items.length / perPage));

  // Reset to page 1 whenever items change
  useEffect(() => {
    setPage(1);
  }, [items, perPage]);

  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  const go = (p) => setPage(Math.min(Math.max(1, p), pageCount));
  const next = () => go(page + 1);
  const prev = () => go(page - 1);

  return { page, pageCount, current, next, prev, go };
}
