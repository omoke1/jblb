import type { ProtocolCategory, SortOption } from "../../types/defi";

interface FilterBarProps {
  selectedCategory?: ProtocolCategory;
  sortOption: SortOption;
  onCategoryChange: (category?: ProtocolCategory) => void;
  onSortChange: (sort: SortOption) => void;
}

/**
 * FilterBar component for filtering and sorting protocols
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  sortOption,
  onCategoryChange,
  onSortChange,
}) => {
  const categories: ProtocolCategory[] = [
    "DEX",
    "Lending",
    "Yield",
    "Perpetuals",
    "Stablecoins",
    "Bridge",
    "Derivatives",
    "Options",
    "Insurance",
    "RWA",
    "Yield Aggregator",
    "Liquid Staking",
    "CDP",
    "Synthetics",
    "Other",
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "tvl-desc", label: "TVL (High to Low)" },
    { value: "tvl-asc", label: "TVL (Low to High)" },
    { value: "apy-desc", label: "APY (High to Low)" },
    { value: "apy-asc", label: "APY (Low to High)" },
    { value: "volume-desc", label: "Volume (High to Low)" },
    { value: "name-asc", label: "Name (A-Z)" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-bodyTextDim">Category:</span>
        <select
          value={selectedCategory || ""}
          onChange={(e) =>
            onCategoryChange(
              e.target.value ? (e.target.value as ProtocolCategory) : undefined
            )
          }
          className="bg-bgColor border border-borderColor rounded-lg px-3 py-2 text-bodyText text-sm focus:outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-bodyTextDim">Sort by:</span>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-bgColor border border-borderColor rounded-lg px-3 py-2 text-bodyText text-sm focus:outline-none focus:border-primary"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


