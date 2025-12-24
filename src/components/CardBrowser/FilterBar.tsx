import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import './FilterBar.css';

export function FilterBar() {
  const filters = useStore((state) => state.filters);
  const setFilter = useStore((state) => state.setFilter);

  // Local state for debounced search
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        setFilter('search', searchInput);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, filters.search, setFilter]);

  const handleClearSearch = () => {
    setSearchInput('');
    setFilter('search', '');
  };

  return (
    <div className="filter-bar">
      <select
        className="filter-dropdown"
        value={filters.color}
        onChange={(e) => setFilter('color', e.target.value)}
      >
        <option value="all">All Colors</option>
        <option value="red">🔴 Red</option>
        <option value="green">🟢 Green</option>
        <option value="blue">🔵 Blue</option>
        <option value="purple">🟣 Purple</option>
        <option value="black">⚫ Black</option>
        <option value="yellow">🟡 Yellow</option>
      </select>

      <select
        className="filter-dropdown"
        value={filters.cost}
        onChange={(e) => setFilter('cost', e.target.value)}
      >
        <option value="any">Any Cost</option>
        <option value="0-2">0-2</option>
        <option value="3-5">3-5</option>
        <option value="6+">6+</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <select
        className="filter-dropdown"
        value={filters.type}
        onChange={(e) => setFilter('type', e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="leader">Leader</option>
        <option value="character">Character</option>
        <option value="event">Event</option>
        <option value="stage">Stage</option>
      </select>

      <select
        className="filter-dropdown"
        value={filters.sort}
        onChange={(e) => setFilter('sort', e.target.value)}
      >
        <option value="name">Sort: Name</option>
        <option value="cost">Sort: Cost</option>
        <option value="power">Sort: Power</option>
        <option value="color">Sort: Color</option>
      </select>

      <div className="filter-search">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search cards..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && (
          <button className="search-clear" onClick={handleClearSearch}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
