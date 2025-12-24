import type { Card } from '../../types';
import './CardGrid.css';

interface CardGridProps {
  cards: Card[];
  loading?: boolean;
  error?: string | null;
  onCardClick?: (card: Card) => void;
  onResetFilters?: () => void;
  onRetry?: () => void;
}

export function CardGrid({ cards, loading, error, onCardClick, onResetFilters, onRetry }: CardGridProps) {
  // Loading state
  if (loading) {
    return (
      <div className="card-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card-skeleton" />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card-grid-error">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={onRetry}>
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (cards.length === 0) {
    return (
      <div className="card-grid-empty">
        <p>No cards match your filters</p>
        <button className="btn btn-primary" onClick={onResetFilters}>Reset Filters</button>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <div
          key={card.id}
          className="card-item card-hover"
          onClick={() => onCardClick?.(card)}
        >
          <img
            src={card.imageUrl}
            alt={card.name}
            loading="lazy"
            className="card-image"
          />
          <div className="card-cost-badge">{card.cost}</div>
        </div>
      ))}
    </div>
  );
}
