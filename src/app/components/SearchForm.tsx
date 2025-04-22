import { Search, XIcon } from "lucide-react";

type SearchFormProps = {
  setSearchQuery: (searchQuery: string) => void;
  searchQuery: string;
  btnClass: string;
  clearSearch: (e: React.FormEvent) => void;
  inputClass: string;
};
const SearchForm = ({
  setSearchQuery,
  searchQuery,
  btnClass,
  clearSearch,
  inputClass,
}: SearchFormProps) => {
  return (
    <form className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={inputClass}
      />
      {!searchQuery ? (
        <button type="submit" className={btnClass}>
          <Search size={16} />
        </button>
      ) : (
        <button type="submit" onClick={clearSearch} className={btnClass}>
          <XIcon size={16} />
        </button>
      )}
    </form>
  );
};
export default SearchForm;
