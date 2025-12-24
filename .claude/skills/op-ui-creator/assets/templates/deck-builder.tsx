/**
 * OP-UI-CREATOR: Deck Builder Template
 * Three-column layout with filter bar, card grid, and deck preview
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
  imageUrl: string;
  rarity?: string;
}

interface DeckCard extends Card {
  quantity: number;
}

interface Deck {
  id: string;
  name: string;
  cards: DeckCard[];
  maxCards: number;
}

interface FilterState {
  color: string[];
  cost: string;
  type: string;
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

const COST_OPTIONS = ['Any', '0-2', '3-5', '6-8', '9+'];
const TYPE_OPTIONS = ['All', 'Leader', 'Character', 'Event', 'Stage'];
const SORT_OPTIONS = ['Name', 'Cost', 'Color', 'Type'];

// ===== COMPONENTS =====

const FilterBar: React.FC<{
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}> = ({ filters, onFilterChange }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleColor = (colorId: string) => {
    const newColors = filters.color.includes(colorId)
      ? filters.color.filter(c => c !== colorId)
      : [...filters.color, colorId];
    onFilterChange({ ...filters, color: newColors });
  };

  return (
    <div className="filter-bar">
      {/* Color Filter */}
      <div className="filter-dropdown">
        <button
          className="filter-trigger"
          onClick={() => setOpenDropdown(openDropdown === 'color' ? null : 'color')}
        >
          Color {filters.color.length > 0 && `(${filters.color.length})`}
          <ChevronDown />
        </button>
        {openDropdown === 'color' && (
          <div className="filter-menu">
            {COLORS.map(color => (
              <button
                key={color.id}
                className="filter-option"
                onClick={() => toggleColor(color.id)}
              >
                <span className="color-dot" style={{ backgroundColor: color.hex }} />
                {color.label}
                {filters.color.includes(color.id) && <Check />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cost Filter */}
      <div className="filter-dropdown">
        <button
          className="filter-trigger"
          onClick={() => setOpenDropdown(openDropdown === 'cost' ? null : 'cost')}
        >
          Cost: {filters.cost}
          <ChevronDown />
        </button>
        {openDropdown === 'cost' && (
          <div className="filter-menu">
            {COST_OPTIONS.map(opt => (
              <button
                key={opt}
                className="filter-option"
                onClick={() => {
                  onFilterChange({ ...filters, cost: opt });
                  setOpenDropdown(null);
                }}
              >
                {opt}
                {filters.cost === opt && <Check />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Type Filter */}
      <div className="filter-dropdown">
        <button
          className="filter-trigger"
          onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
        >
          Type: {filters.type}
          <ChevronDown />
        </button>
        {openDropdown === 'type' && (
          <div className="filter-menu">
            {TYPE_OPTIONS.map(opt => (
              <button
                key={opt}
                className="filter-option"
                onClick={() => {
                  onFilterChange({ ...filters, type: opt });
                  setOpenDropdown(null);
                }}
              >
                {opt}
                {filters.type === opt && <Check />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="filter-dropdown">
        <button
          className="filter-trigger"
          onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
        >
          Sort: {filters.sort}
          <ChevronDown />
        </button>
        {openDropdown === 'sort' && (
          <div className="filter-menu">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt}
                className="filter-option"
                onClick={() => {
                  onFilterChange({ ...filters, sort: opt });
                  setOpenDropdown(null);
                }}
              >
                {opt}
                {filters.sort === opt && <Check />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="search-field">
        <Search />
        <input
          type="text"
          placeholder="Search cards..."
          value={filters.search}
          onChange={e => onFilterChange({ ...filters, search: e.target.value })}
        />
        {filters.search && (
          <button className="clear-search" onClick={() => onFilterChange({ ...filters, search: '' })}>
            <X />
          </button>
        )}
      </div>
    </div>
  );
};

const CardGrid: React.FC<{
  cards: Card[];
  onCardClick: (card: Card) => void;
  selectedCards: string[];
}> = ({ cards, onCardClick, selectedCards }) => {
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
          className={`card-item ${selectedCards.includes(card.id) ? 'selected' : ''}`}
          onClick={() => onCardClick(card)}
        >
          <img src={card.imageUrl} alt={card.name} />
          <div className="card-cost">{card.cost}</div>
          {selectedCards.includes(card.id) && (
            <div className="card-selected-badge">
              <Check />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const DeckPanel: React.FC<{
  deck: Deck;
  onDeckNameChange: (name: string) => void;
  onSave: () => void;
  onExport: () => void;
}> = ({ deck, onDeckNameChange, onSave, onExport }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="deck-panel panel">
      <div className="panel-header">DECK</div>

      {/* Deck Selector */}
      <select className="deck-selector">
        <option>My Decks</option>
        <option>New Deck</option>
      </select>

      {/* Deck Name */}
      <div className="deck-name">
        {isEditing ? (
          <input
            type="text"
            value={deck.name}
            onChange={e => onDeckNameChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditing(true)}>{deck.name}</span>
        )}
        <button className="icon-btn" onClick={() => setIsEditing(true)}>
          <Edit />
        </button>
      </div>

      {/* Format */}
      <div className="deck-format">
        <span className="label">Format</span>
        <span className="value">Standard</span>
      </div>

      {/* Actions */}
      <div className="deck-actions">
        <button className="icon-btn" title="Save" onClick={onSave}>
          <Save />
        </button>
        <button className="icon-btn" title="Export" onClick={onExport}>
          <Download />
        </button>
        <button className="icon-btn" title="Share">
          <Share />
        </button>
        <button className="icon-btn" title="Copy">
          <Copy />
        </button>
      </div>

      {/* External Links */}
      <div className="deck-links">
        <a href="#" className="text-link">View on TCGPlayer</a>
        <a href="#" className="text-link">Import from URL</a>
      </div>
    </div>
  );
};

const DeckPreview: React.FC<{
  deck: Deck;
  onRemoveCard: (cardId: string) => void;
  onUpdateQuantity: (cardId: string, quantity: number) => void;
}> = ({ deck, onRemoveCard, onUpdateQuantity }) => {
  const totalCards = deck.cards.reduce((sum, card) => sum + card.quantity, 0);
  const progress = (totalCards / deck.maxCards) * 100;

  // Cost curve calculation
  const costCurve = useMemo(() => {
    const curve: number[] = new Array(11).fill(0);
    deck.cards.forEach(card => {
      const costIndex = Math.min(card.cost, 10);
      curve[costIndex] += card.quantity;
    });
    const maxCount = Math.max(...curve, 1);
    return curve.map(count => (count / maxCount) * 100);
  }, [deck.cards]);

  return (
    <div className="deck-preview panel">
      {/* Header */}
      <div className="preview-header">
        <span className="panel-header">DECK</span>
        <span className="card-count">
          {totalCards}/{deck.maxCards}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Card List */}
      <div className="deck-list">
        {deck.cards.length === 0 ? (
          <div className="empty-state-small">
            <p>No cards in deck yet</p>
          </div>
        ) : (
          deck.cards.map(card => (
            <div key={card.id} className="deck-list-item">
              <img src={card.imageUrl} alt={card.name} className="card-thumb" />
              <span className="card-name">{card.name}</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(card.id, card.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">×{card.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(card.id, card.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cost Curve */}
      <div className="cost-curve">
        <div className="curve-label">Cost Curve</div>
        <div className="curve-bars">
          {costCurve.map((height, index) => (
            <div key={index} className="curve-bar-container">
              <div className="curve-bar" style={{ height: `${height}%` }} />
              <span className="curve-label-x">{index === 10 ? '10+' : index}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== ICONS =====

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

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

const Edit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const Save = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <path d="M17 21v-8H7v8M7 3v5h8" />
  </svg>
);

const Download = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const Share = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
);

const Copy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

// ===== MAIN COMPONENT =====

export const DeckBuilder: React.FC = () => {
  // Sample data - replace with your data source
  const [cards] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Deck>({
    id: '1',
    name: 'My New Deck',
    cards: [],
    maxCards: 51,
  });
  const [filters, setFilters] = useState<FilterState>({
    color: [],
    cost: 'Any',
    type: 'All',
    search: '',
    sort: 'Name',
  });
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleCardClick = (card: Card) => {
    // Add card to deck logic
    const existingCard = deck.cards.find(c => c.id === card.id);
    if (existingCard) {
      setDeck({
        ...deck,
        cards: deck.cards.map(c =>
          c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c
        ),
      });
    } else {
      setDeck({
        ...deck,
        cards: [...deck.cards, { ...card, quantity: 1 }],
      });
    }
  };

  const handleRemoveCard = (cardId: string) => {
    setDeck({
      ...deck,
      cards: deck.cards.filter(c => c.id !== cardId),
    });
  };

  const handleUpdateQuantity = (cardId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCard(cardId);
    } else {
      setDeck({
        ...deck,
        cards: deck.cards.map(c =>
          c.id === cardId ? { ...c, quantity } : c
        ),
      });
    }
  };

  return (
    <div className="deck-builder">
      {/* Left Panel */}
      <DeckPanel
        deck={deck}
        onDeckNameChange={name => setDeck({ ...deck, name })}
        onSave={() => console.log('Save deck')}
        onExport={() => console.log('Export deck')}
      />

      {/* Center Panel */}
      <div className="browser-panel">
        <FilterBar filters={filters} onFilterChange={setFilters} />
        <div className="results-count">{cards.length} cards</div>
        <CardGrid
          cards={cards}
          onCardClick={handleCardClick}
          selectedCards={selectedCards}
        />
      </div>

      {/* Right Panel */}
      <DeckPreview
        deck={deck}
        onRemoveCard={handleRemoveCard}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default DeckBuilder;

// ===== STYLES =====
// Add these styles to your CSS file or use CSS-in-JS

/*
.deck-builder {
  display: grid;
  grid-template-columns: 240px 1fr 280px;
  gap: var(--space-4);
  height: 100vh;
  padding: var(--space-4);
  background: var(--bg-base);
}

.filter-bar {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--bg-panel);
  border-radius: var(--radius-md);
  position: sticky;
  top: 0;
}

.filter-dropdown {
  position: relative;
}

.filter-trigger {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  font-size: var(--text-sm);
}

.filter-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--space-1);
  min-width: 160px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
  padding: var(--space-1);
}

.filter-option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  font-size: var(--text-sm);
  text-align: left;
}

.filter-option:hover {
  background: var(--bg-hover);
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
}

.search-field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  flex: 1;
}

.search-field input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: var(--text-sm);
  outline: none;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-4);
  padding: var(--space-4);
  overflow-y: auto;
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

.deck-list {
  flex: 1;
  overflow-y: auto;
}

.deck-list-item {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
}

.deck-list-item:hover {
  background: var(--bg-hover);
}

.card-thumb {
  width: 32px;
  height: 45px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.progress-bar {
  height: 4px;
  background: var(--bg-card);
  border-radius: var(--radius-full);
  margin: var(--space-3) 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-cyan));
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}

.cost-curve {
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
}

.curve-bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 40px;
}

.curve-bar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.curve-bar {
  width: 100%;
  background: var(--accent-gold);
  border-radius: 2px 2px 0 0;
  min-height: 2px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  color: var(--text-tertiary);
}
*/
