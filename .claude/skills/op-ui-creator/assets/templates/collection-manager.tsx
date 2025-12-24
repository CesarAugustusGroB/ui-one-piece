/**
 * OP-UI-CREATOR: Collection Manager Template
 * Grid layout with grouping, bulk selection, and stats dashboard
 */

import React, { useState, useMemo } from 'react';
import './design-tokens.css';

// ===== TYPE DEFINITIONS =====

interface Card {
  id: string;
  name: string;
  cost: number;
  color: string;
  type: string;
  rarity: string;
  set: string;
  cardNumber: string;
  imageUrl: string;
}

interface CollectionCard extends Card {
  owned: number;
  wanted: number;
  foilOwned: number;
}

interface CollectionStats {
  totalCards: number;
  uniqueCards: number;
  completionPercentage: number;
  totalValue: number;
  bySet: { set: string; owned: number; total: number }[];
  byRarity: { rarity: string; owned: number; total: number }[];
}

interface FilterState {
  search: string;
  set: string;
  rarity: string;
  ownership: 'all' | 'owned' | 'missing' | 'wanted';
  groupBy: 'none' | 'set' | 'color' | 'type' | 'rarity';
  sort: string;
}

// ===== CONSTANTS =====

const RARITY_ORDER = ['Common', 'Uncommon', 'Rare', 'Super Rare', 'Secret Rare', 'Leader'];
const OWNERSHIP_OPTIONS = [
  { id: 'all', label: 'All Cards' },
  { id: 'owned', label: 'Owned' },
  { id: 'missing', label: 'Missing' },
  { id: 'wanted', label: 'Wanted' },
];
const GROUP_OPTIONS = [
  { id: 'none', label: 'No Grouping' },
  { id: 'set', label: 'By Set' },
  { id: 'color', label: 'By Color' },
  { id: 'type', label: 'By Type' },
  { id: 'rarity', label: 'By Rarity' },
];

// ===== COMPONENTS =====

const StatsPanel: React.FC<{ stats: CollectionStats }> = ({ stats }) => {
  return (
    <div className="stats-panel">
      {/* Main Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.uniqueCards}</span>
          <span className="stat-label">Unique Cards</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.totalCards}</span>
          <span className="stat-label">Total Cards</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-value">{stats.completionPercentage}%</span>
          <span className="stat-label">Complete</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">${stats.totalValue.toFixed(0)}</span>
          <span className="stat-label">Est. Value</span>
        </div>
      </div>

      {/* Set Progress */}
      <div className="stats-section">
        <h3 className="section-title">Set Progress</h3>
        <div className="progress-list">
          {stats.bySet.map(set => (
            <div key={set.set} className="progress-item">
              <div className="progress-header">
                <span className="progress-name">{set.set}</span>
                <span className="progress-count">
                  {set.owned}/{set.total}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(set.owned / set.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rarity Breakdown */}
      <div className="stats-section">
        <h3 className="section-title">By Rarity</h3>
        <div className="rarity-grid">
          {stats.byRarity.map(rarity => (
            <div key={rarity.rarity} className="rarity-item">
              <span className="rarity-name">{rarity.rarity}</span>
              <span className="rarity-count">
                {rarity.owned}/{rarity.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Toolbar: React.FC<{
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  selectedCount: number;
  onBulkAction: (action: string) => void;
  sets: string[];
}> = ({ filters, onFilterChange, selectedCount, onBulkAction, sets }) => {
  return (
    <div className="toolbar">
      {/* Search */}
      <div className="search-field">
        <Search />
        <input
          type="text"
          placeholder="Search collection..."
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

      {/* Filters */}
      <div className="filter-group">
        <select
          className="filter-select"
          value={filters.set}
          onChange={e => onFilterChange({ ...filters, set: e.target.value })}
        >
          <option value="all">All Sets</option>
          {sets.map(set => (
            <option key={set} value={set}>{set}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filters.ownership}
          onChange={e => onFilterChange({ ...filters, ownership: e.target.value as FilterState['ownership'] })}
        >
          {OWNERSHIP_OPTIONS.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filters.groupBy}
          onChange={e => onFilterChange({ ...filters, groupBy: e.target.value as FilterState['groupBy'] })}
        >
          {GROUP_OPTIONS.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">{selectedCount} selected</span>
          <button className="btn btn-ghost" onClick={() => onBulkAction('add')}>
            <Plus /> Add to Deck
          </button>
          <button className="btn btn-ghost" onClick={() => onBulkAction('want')}>
            <Heart /> Want
          </button>
          <button className="btn btn-ghost" onClick={() => onBulkAction('export')}>
            <Download /> Export
          </button>
        </div>
      )}
    </div>
  );
};

const CollectionCard: React.FC<{
  card: CollectionCard;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateOwned: (count: number) => void;
  onUpdateWanted: (count: number) => void;
}> = ({ card, isSelected, onSelect, onUpdateOwned, onUpdateWanted }) => {
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      className={`collection-card ${isSelected ? 'selected' : ''} ${card.owned === 0 ? 'not-owned' : ''}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Selection Checkbox */}
      <button
        className={`select-checkbox ${isSelected ? 'checked' : ''}`}
        onClick={e => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {isSelected && <Check />}
      </button>

      {/* Card Image */}
      <div className="card-image">
        <img src={card.imageUrl} alt={card.name} loading="lazy" />
        {card.owned === 0 && <div className="not-owned-overlay" />}
      </div>

      {/* Owned Badge */}
      {card.owned > 0 && (
        <div className="owned-badge">×{card.owned}</div>
      )}

      {/* Foil Badge */}
      {card.foilOwned > 0 && (
        <div className="foil-badge">
          <Sparkle />
          {card.foilOwned}
        </div>
      )}

      {/* Wanted Badge */}
      {card.wanted > 0 && (
        <div className="wanted-badge">
          <Heart />
        </div>
      )}

      {/* Hover Controls */}
      {showControls && (
        <div className="card-controls">
          <div className="control-row">
            <span className="control-label">Owned</span>
            <div className="quantity-control">
              <button onClick={() => onUpdateOwned(Math.max(0, card.owned - 1))}>-</button>
              <span>{card.owned}</span>
              <button onClick={() => onUpdateOwned(card.owned + 1)}>+</button>
            </div>
          </div>
          <div className="control-row">
            <span className="control-label">Wanted</span>
            <div className="quantity-control">
              <button onClick={() => onUpdateWanted(Math.max(0, card.wanted - 1))}>-</button>
              <span>{card.wanted}</span>
              <button onClick={() => onUpdateWanted(card.wanted + 1)}>+</button>
            </div>
          </div>
        </div>
      )}

      {/* Card Info */}
      <div className="card-info">
        <span className="card-name">{card.name}</span>
        <span className="card-set">{card.set} · {card.cardNumber}</span>
      </div>
    </div>
  );
};

const CardGroup: React.FC<{
  title: string;
  cards: CollectionCard[];
  selectedIds: Set<string>;
  onSelectCard: (id: string) => void;
  onUpdateOwned: (id: string, count: number) => void;
  onUpdateWanted: (id: string, count: number) => void;
}> = ({ title, cards, selectedIds, onSelectCard, onUpdateOwned, onUpdateWanted }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="card-group">
      <button className="group-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <ChevronDown className={isCollapsed ? 'collapsed' : ''} />
        <span className="group-title">{title}</span>
        <span className="group-count">{cards.length} cards</span>
      </button>

      {!isCollapsed && (
        <div className="group-grid">
          {cards.map(card => (
            <CollectionCard
              key={card.id}
              card={card}
              isSelected={selectedIds.has(card.id)}
              onSelect={() => onSelectCard(card.id)}
              onUpdateOwned={count => onUpdateOwned(card.id, count)}
              onUpdateWanted={count => onUpdateWanted(card.id, count)}
            />
          ))}
        </div>
      )}
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

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const Heart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const Download = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const Sparkle = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

// ===== MAIN COMPONENT =====

export const CollectionManager: React.FC = () => {
  // Sample data - replace with your data source
  const [collection, setCollection] = useState<CollectionCard[]>([]);
  const [sets] = useState<string[]>(['OP-01', 'OP-02', 'OP-03', 'OP-04', 'OP-05']);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    set: 'all',
    rarity: 'all',
    ownership: 'all',
    groupBy: 'set',
    sort: 'number',
  });

  // Calculate stats
  const stats: CollectionStats = useMemo(() => {
    const uniqueOwned = collection.filter(c => c.owned > 0).length;
    const totalOwned = collection.reduce((sum, c) => sum + c.owned, 0);
    const totalCards = collection.length;

    const bySet = sets.map(set => {
      const setCards = collection.filter(c => c.set === set);
      return {
        set,
        owned: setCards.filter(c => c.owned > 0).length,
        total: setCards.length,
      };
    });

    const byRarity = RARITY_ORDER.map(rarity => {
      const rarityCards = collection.filter(c => c.rarity === rarity);
      return {
        rarity,
        owned: rarityCards.filter(c => c.owned > 0).length,
        total: rarityCards.length,
      };
    }).filter(r => r.total > 0);

    return {
      totalCards: totalOwned,
      uniqueCards: uniqueOwned,
      completionPercentage: totalCards > 0 ? Math.round((uniqueOwned / totalCards) * 100) : 0,
      totalValue: 0, // Calculate from price data
      bySet,
      byRarity,
    };
  }, [collection, sets]);

  // Filter and group cards
  const filteredCards = useMemo(() => {
    return collection.filter(card => {
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (!card.name.toLowerCase().includes(search)) return false;
      }
      if (filters.set !== 'all' && card.set !== filters.set) return false;
      if (filters.rarity !== 'all' && card.rarity !== filters.rarity) return false;
      if (filters.ownership === 'owned' && card.owned === 0) return false;
      if (filters.ownership === 'missing' && card.owned > 0) return false;
      if (filters.ownership === 'wanted' && card.wanted === 0) return false;
      return true;
    });
  }, [collection, filters]);

  const groupedCards = useMemo(() => {
    if (filters.groupBy === 'none') {
      return [{ title: 'All Cards', cards: filteredCards }];
    }

    const groups: Record<string, CollectionCard[]> = {};
    filteredCards.forEach(card => {
      const key = card[filters.groupBy as keyof CollectionCard] as string;
      if (!groups[key]) groups[key] = [];
      groups[key].push(card);
    });

    return Object.entries(groups).map(([title, cards]) => ({ title, cards }));
  }, [filteredCards, filters.groupBy]);

  const handleSelectCard = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleUpdateOwned = (id: string, count: number) => {
    setCollection(collection.map(c =>
      c.id === id ? { ...c, owned: count } : c
    ));
  };

  const handleUpdateWanted = (id: string, count: number) => {
    setCollection(collection.map(c =>
      c.id === id ? { ...c, wanted: count } : c
    ));
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`, Array.from(selectedIds));
    // Implement bulk actions
  };

  return (
    <div className="collection-manager">
      {/* Stats Sidebar */}
      <aside className="stats-sidebar">
        <StatsPanel stats={stats} />
      </aside>

      {/* Main Content */}
      <main className="collection-main">
        <Toolbar
          filters={filters}
          onFilterChange={setFilters}
          selectedCount={selectedIds.size}
          onBulkAction={handleBulkAction}
          sets={sets}
        />

        <div className="collection-content">
          {groupedCards.length === 0 ? (
            <div className="empty-state">
              <p>No cards match your filters</p>
              <button className="btn btn-ghost">Reset Filters</button>
            </div>
          ) : (
            groupedCards.map(group => (
              <CardGroup
                key={group.title}
                title={group.title}
                cards={group.cards}
                selectedIds={selectedIds}
                onSelectCard={handleSelectCard}
                onUpdateOwned={handleUpdateOwned}
                onUpdateWanted={handleUpdateWanted}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CollectionManager;

// ===== STYLES =====
// Add these styles to your CSS file or use CSS-in-JS

/*
.collection-manager {
  display: grid;
  grid-template-columns: 320px 1fr;
  height: 100vh;
  background: var(--bg-base);
}

.stats-sidebar {
  background: var(--bg-panel);
  border-right: 1px solid var(--border-subtle);
  padding: var(--space-4);
  overflow-y: auto;
}

.stats-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.stat-card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.stat-card.highlight {
  background: linear-gradient(135deg, rgba(201,169,98,0.2), rgba(94,205,201,0.2));
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.section-title {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin: 0 0 var(--space-3) 0;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
}

.progress-name {
  color: var(--text-primary);
}

.progress-count {
  color: var(--text-tertiary);
}

.progress-bar {
  height: 4px;
  background: var(--bg-card);
  border-radius: var(--radius-full);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-cyan));
  border-radius: var(--radius-full);
}

.collection-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
  flex-wrap: wrap;
}

.search-field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-panel);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  min-width: 240px;
}

.search-field input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary);
  outline: none;
}

.filter-group {
  display: flex;
  gap: var(--space-2);
}

.filter-select {
  padding: var(--space-2) var(--space-3);
  background: var(--bg-panel);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: var(--text-sm);
}

.bulk-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
  padding-left: var(--space-4);
  border-left: 1px solid var(--border-subtle);
}

.selected-count {
  font-size: var(--text-sm);
  color: var(--accent-gold);
  font-weight: var(--font-medium);
}

.collection-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
}

.card-group {
  margin-bottom: var(--space-6);
}

.group-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) 0;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  font-size: var(--text-base);
}

.group-header svg.collapsed {
  transform: rotate(-90deg);
}

.group-title {
  font-weight: var(--font-medium);
}

.group-count {
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

.group-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-3);
}

.collection-card {
  position: relative;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-base);
}

.collection-card:hover {
  transform: translateY(-2px);
}

.collection-card.selected {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.collection-card.not-owned {
  opacity: 0.6;
}

.select-checkbox {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  width: 20px;
  height: 20px;
  background: var(--bg-panel);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.collection-card:hover .select-checkbox,
.select-checkbox.checked {
  opacity: 1;
}

.select-checkbox.checked {
  background: var(--accent-gold);
  border-color: var(--accent-gold);
}

.card-image {
  aspect-ratio: 5 / 7;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.not-owned-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.owned-badge {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-2);
  background: var(--bg-panel);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
}

.foil-badge {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  background: linear-gradient(135deg, #C9A962, #5ECDC9);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
  font-size: var(--text-xs);
  display: flex;
  align-items: center;
  gap: 2px;
}

.wanted-badge {
  position: absolute;
  bottom: var(--space-2);
  left: var(--space-2);
  color: var(--accent-red);
}

.card-controls {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-3);
}

.control-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-label {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.quantity-control button {
  width: 24px;
  height: 24px;
  background: var(--bg-card);
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
}

.card-info {
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-set {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  color: var(--text-tertiary);
}
*/
