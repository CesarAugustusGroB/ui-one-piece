/**
 * OP-UI-CREATOR: Card Browser Template
 * Two-column layout with filters and card grid with detail drawer
 */

import React, { useState, useMemo } from 'react';
import './design-tokens.css';

// ===== TYPE DEFINITIONS =====

interface Card {
  id: string;
  name: string;
  cost: number;
  power?: number;
  counter?: number;
  color: string;
  type: string;
  attribute?: string;
  effect?: string;
  imageUrl: string;
  rarity: string;
  set: string;
  cardNumber: string;
}

interface FilterState {
  colors: string[];
  cost: string;
  type: string;
  rarity: string;
  set: string;
  search: string;
  sort: string;
}

// ===== CONSTANTS =====

const COLORS = [
  { id: 'red', label: 'Red', hex: '#E85454' },
  { id: 'blue', label: 'Blue', hex: '#5ECDC9' },
  { id: 'green', label: 'Green', hex: '#4ADE80' },
  { id: 'purple', label: 'Purple', hex: '#A78BFA' },
  { id: 'black', label: 'Black', hex: '#71717A' },
  { id: 'yellow', label: 'Yellow', hex: '#C9A962' },
];

const COST_OPTIONS = ['Any', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];
const TYPE_OPTIONS = ['All', 'Leader', 'Character', 'Event', 'Stage'];
const RARITY_OPTIONS = ['All', 'Common', 'Uncommon', 'Rare', 'Super Rare', 'Secret Rare'];
const SORT_OPTIONS = ['Name A-Z', 'Name Z-A', 'Cost Low-High', 'Cost High-Low', 'Newest'];

// ===== COMPONENTS =====

const Sidebar: React.FC<{
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  sets: string[];
}> = ({ filters, onFilterChange, sets }) => {
  const toggleColor = (colorId: string) => {
    const newColors = filters.colors.includes(colorId)
      ? filters.colors.filter(c => c !== colorId)
      : [...filters.colors, colorId];
    onFilterChange({ ...filters, colors: newColors });
  };

  const clearFilters = () => {
    onFilterChange({
      colors: [],
      cost: 'Any',
      type: 'All',
      rarity: 'All',
      set: 'All',
      search: '',
      sort: 'Name A-Z',
    });
  };

  const hasActiveFilters =
    filters.colors.length > 0 ||
    filters.cost !== 'Any' ||
    filters.type !== 'All' ||
    filters.rarity !== 'All' ||
    filters.set !== 'All';

  return (
    <div className="sidebar panel">
      <div className="sidebar-header">
        <span className="panel-header">FILTERS</span>
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="filter-section">
        <div className="search-input">
          <Search />
          <input
            type="text"
            placeholder="Search cards..."
            value={filters.search}
            onChange={e => onFilterChange({ ...filters, search: e.target.value })}
          />
          {filters.search && (
            <button
              className="clear-btn"
              onClick={() => onFilterChange({ ...filters, search: '' })}
            >
              <X />
            </button>
          )}
        </div>
      </div>

      {/* Color Filter */}
      <div className="filter-section">
        <label className="filter-label">Color</label>
        <div className="color-filter">
          {COLORS.map(color => (
            <button
              key={color.id}
              className={`color-btn ${filters.colors.includes(color.id) ? 'active' : ''}`}
              style={{ '--color': color.hex } as React.CSSProperties}
              onClick={() => toggleColor(color.id)}
              title={color.label}
            >
              <span className="color-circle" />
            </button>
          ))}
        </div>
      </div>

      {/* Cost Filter */}
      <div className="filter-section">
        <label className="filter-label">Cost</label>
        <select
          className="filter-select"
          value={filters.cost}
          onChange={e => onFilterChange({ ...filters, cost: e.target.value })}
        >
          {COST_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="filter-section">
        <label className="filter-label">Type</label>
        <select
          className="filter-select"
          value={filters.type}
          onChange={e => onFilterChange({ ...filters, type: e.target.value })}
        >
          {TYPE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Rarity Filter */}
      <div className="filter-section">
        <label className="filter-label">Rarity</label>
        <select
          className="filter-select"
          value={filters.rarity}
          onChange={e => onFilterChange({ ...filters, rarity: e.target.value })}
        >
          {RARITY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Set Filter */}
      <div className="filter-section">
        <label className="filter-label">Set</label>
        <select
          className="filter-select"
          value={filters.set}
          onChange={e => onFilterChange({ ...filters, set: e.target.value })}
        >
          <option value="All">All Sets</option>
          {sets.map(set => (
            <option key={set} value={set}>{set}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="filter-section">
        <label className="filter-label">Sort By</label>
        <select
          className="filter-select"
          value={filters.sort}
          onChange={e => onFilterChange({ ...filters, sort: e.target.value })}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const CardGrid: React.FC<{
  cards: Card[];
  onCardSelect: (card: Card) => void;
  selectedCardId: string | null;
}> = ({ cards, onCardSelect, selectedCardId }) => {
  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <p>No cards match your filters</p>
        <button className="btn btn-ghost">Reset Filters</button>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {cards.map(card => (
        <div
          key={card.id}
          className={`card-item ${selectedCardId === card.id ? 'selected' : ''}`}
          onClick={() => onCardSelect(card)}
        >
          <img src={card.imageUrl} alt={card.name} loading="lazy" />
          <div className="card-cost-badge">{card.cost}</div>
        </div>
      ))}
    </div>
  );
};

const CardDetailDrawer: React.FC<{
  card: Card | null;
  onClose: () => void;
}> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="card-drawer">
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer-content panel">
        <button className="drawer-close" onClick={onClose}>
          <X />
        </button>

        {/* Card Image */}
        <div className="drawer-image">
          <img src={card.imageUrl} alt={card.name} />
        </div>

        {/* Card Info */}
        <div className="drawer-info">
          <h2 className="card-title">{card.name}</h2>

          <div className="card-meta">
            <span className="meta-item">
              <span className="meta-label">Cost</span>
              <span className="meta-value">{card.cost}</span>
            </span>
            {card.power && (
              <span className="meta-item">
                <span className="meta-label">Power</span>
                <span className="meta-value">{card.power}</span>
              </span>
            )}
            {card.counter && (
              <span className="meta-item">
                <span className="meta-label">Counter</span>
                <span className="meta-value">+{card.counter}</span>
              </span>
            )}
          </div>

          <div className="card-tags">
            <span className="tag" style={{ backgroundColor: COLORS.find(c => c.id === card.color)?.hex }}>
              {card.color}
            </span>
            <span className="tag">{card.type}</span>
            <span className="tag">{card.rarity}</span>
          </div>

          {card.attribute && (
            <div className="card-attribute">
              <span className="attr-label">Attribute</span>
              <span className="attr-value">{card.attribute}</span>
            </div>
          )}

          {card.effect && (
            <div className="card-effect">
              <span className="effect-label">Effect</span>
              <p className="effect-text">{card.effect}</p>
            </div>
          )}

          <div className="card-set-info">
            <span>{card.set}</span>
            <span className="separator">•</span>
            <span>{card.cardNumber}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="drawer-actions">
          <button className="btn btn-primary">Add to Deck</button>
          <button className="btn btn-ghost">View Prices</button>
        </div>
      </div>
    </div>
  );
};

// ===== ICONS =====

const Search = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const X = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Grid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const List = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

// ===== MAIN COMPONENT =====

export const CardBrowser: React.FC = () => {
  // Sample data - replace with your data source
  const [cards] = useState<Card[]>([]);
  const [sets] = useState<string[]>(['OP-01', 'OP-02', 'OP-03', 'OP-04', 'OP-05']);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    cost: 'Any',
    type: 'All',
    rarity: 'All',
    set: 'All',
    search: '',
    sort: 'Name A-Z',
  });

  // Filter logic
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // Color filter
      if (filters.colors.length > 0 && !filters.colors.includes(card.color)) {
        return false;
      }
      // Cost filter
      if (filters.cost !== 'Any') {
        if (filters.cost === '10+' && card.cost < 10) return false;
        if (filters.cost !== '10+' && card.cost !== parseInt(filters.cost)) return false;
      }
      // Type filter
      if (filters.type !== 'All' && card.type !== filters.type) {
        return false;
      }
      // Rarity filter
      if (filters.rarity !== 'All' && card.rarity !== filters.rarity) {
        return false;
      }
      // Set filter
      if (filters.set !== 'All' && card.set !== filters.set) {
        return false;
      }
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (
          !card.name.toLowerCase().includes(search) &&
          !card.effect?.toLowerCase().includes(search)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [cards, filters]);

  // Sort logic
  const sortedCards = useMemo(() => {
    const sorted = [...filteredCards];
    switch (filters.sort) {
      case 'Name A-Z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'Name Z-A':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'Cost Low-High':
        return sorted.sort((a, b) => a.cost - b.cost);
      case 'Cost High-Low':
        return sorted.sort((a, b) => b.cost - a.cost);
      default:
        return sorted;
    }
  }, [filteredCards, filters.sort]);

  return (
    <div className="card-browser">
      {/* Sidebar */}
      <Sidebar
        filters={filters}
        onFilterChange={setFilters}
        sets={sets}
      />

      {/* Main Content */}
      <div className="browser-main">
        {/* Header Bar */}
        <div className="browser-header">
          <span className="results-count">{sortedCards.length} cards</span>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List />
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <CardGrid
          cards={sortedCards}
          onCardSelect={setSelectedCard}
          selectedCardId={selectedCard?.id ?? null}
        />
      </div>

      {/* Detail Drawer */}
      <CardDetailDrawer
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
};

export default CardBrowser;

// ===== STYLES =====
// Add these styles to your CSS file or use CSS-in-JS

/*
.card-browser {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-4);
  height: 100vh;
  padding: var(--space-4);
  background: var(--bg-base);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-filters {
  background: none;
  border: none;
  color: var(--accent-gold);
  font-size: var(--text-sm);
  cursor: pointer;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.filter-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.search-input {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.search-input input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary);
  outline: none;
}

.color-filter {
  display: flex;
  gap: var(--space-2);
}

.color-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  background: var(--bg-card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.color-btn.active {
  border-color: var(--color);
}

.color-circle {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: var(--color);
}

.filter-select {
  padding: var(--space-2) var(--space-3);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: var(--text-sm);
  cursor: pointer;
}

.browser-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.browser-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) 0;
}

.results-count {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.view-toggle {
  display: flex;
  background: var(--bg-panel);
  border-radius: var(--radius-sm);
  padding: 2px;
}

.view-btn {
  padding: var(--space-2);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
}

.view-btn.active {
  background: var(--bg-card);
  color: var(--text-primary);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-4);
  padding: var(--space-2);
  overflow-y: auto;
  flex: 1;
}

.card-item {
  position: relative;
  aspect-ratio: 5 / 7;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.card-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md), var(--shadow-glow-gold);
}

.card-item.selected {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.card-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-cost-badge {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  width: 24px;
  height: 24px;
  background: var(--bg-panel);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
}

.card-drawer {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  justify-content: flex-end;
}

.drawer-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.drawer-content {
  position: relative;
  width: 400px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.drawer-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: var(--bg-card);
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-2);
  cursor: pointer;
  color: var(--text-primary);
}

.drawer-image img {
  width: 100%;
  border-radius: var(--radius-md);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin: 0;
}

.card-meta {
  display: flex;
  gap: var(--space-4);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.meta-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.meta-value {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
}

.card-tags {
  display: flex;
  gap: var(--space-2);
}

.tag {
  padding: var(--space-1) var(--space-2);
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  text-transform: capitalize;
}

.card-effect {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.effect-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.effect-text {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
  margin: 0;
}

.drawer-actions {
  display: flex;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
}

.drawer-actions .btn {
  flex: 1;
}
*/
