export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // ✅ NEW

  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  // ✅ Debounced API call
  useEffect(() => {
    if (query.length <= 1) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchResults(query);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // ✅ Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // ✅ API function
  const fetchResults = async (searchText) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://coombb.com/backend/api/search?q=${searchText}`,
      );

      const data = await res.json();
      setResults(data.data || data);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ click outside close
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[600px]">
      {/* INPUT */}
      <div
        className={`flex items-center bg-[#f2f2f2] rounded-full px-4 py-2.5 gap-2 transition-all duration-200 ${focused ? "bg-white ring-2 ring-charcoal/20 shadow-sm" : "hover:bg-[#e8e8e8]"}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          // ✅ KEYBOARD CONTROL
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((prev) =>
                prev < results.length - 1 ? prev + 1 : 0,
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : results.length - 1,
              );
            }

            if (e.key === "Enter" && activeIndex >= 0) {
              const selected = results[activeIndex];
              window.location.href = `/product-category/${selected.slug}`;
            }

            if (e.key === "Escape") {
              setFocused(false);
              setActiveIndex(-1);
            }
          }}
          placeholder="Search products and brands"
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>

      {/* DROPDOWN */}
      {focused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-xl z-[60]">
          {/* Loading */}
          {loading && (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div>
              {results.slice(0, 6).map((p, index) => (
                <div
                  key={p.id}
                  // ✅ MOUSE HOVER SYNC
                  onMouseEnter={() => setActiveIndex(index)}
                  // ✅ CLICK REDIRECT
                  onClick={() => {
                    window.location.href = `/product-category/${p.slug}`;
                  }}
                  className={`p-3 cursor-pointer transition-colors ${
                    activeIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  {p.name}
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && query.length > 1 && results.length === 0 && (
            <div className="p-4 text-center text-gray-400">
              No results for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
