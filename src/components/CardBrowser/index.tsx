import { useMemo } from 'react';
import { FilterBar } from './FilterBar';
import { CardGrid } from './CardGrid';
import { useStore } from '../../store/useStore';
import type { Card } from '../../types';
import './CardBrowser.css';

export function CardBrowser() {
  const cards = useStore((state) => state.cards);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const loadCards = useStore((state) => state.loadCards);
  const filters = useStore((state) => state.filters);
  const addCardToDeck = useStore((state) => state.addCardToDeck);
  const resetFilters = useStore((state) => state.resetFilters);

  const filteredCards = useMemo(() => {
    let result = [...cards];

    if (filters.color !== 'all') {
      result = result.filter((card) => card.color === filters.color);
    }

    if (filters.cost !== 'any') {
      if (filters.cost === '0-2') {
        result = result.filter((card) => card.cost >= 0 && card.cost <= 2);
      } else if (filters.cost === '3-5') {
        result = result.filter((card) => card.cost >= 3 && card.cost <= 5);
      } else if (filters.cost === '6+') {
        result = result.filter((card) => card.cost >= 6);
      } else {
        const costNum = parseInt(filters.cost);
        result = result.filter((card) => card.cost === costNum);
      }
    }

    if (filters.type !== 'all') {
      result = result.filter((card) => card.type === filters.type);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (card) =>
          card.name.toLowerCase().includes(searchLower) ||
          card.cardNumber.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      switch (filters.sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'cost':
          return a.cost - b.cost;
        case 'power':
          return (b.power ?? 0) - (a.power ?? 0);
        case 'color':
          return a.color.localeCompare(b.color);
        default:
          return 0;
      }
    });

    return result;
  }, [cards, filters]);

  const handleCardClick = (card: Card) => {
    addCardToDeck(card);
  };

  return (
    <div className="card-browser">
      <FilterBar />
      <div className="card-browser-results">
        <span className="results-count">{filteredCards.length} cards</span>
      </div>
      <CardGrid
        cards={filteredCards}
        loading={loading}
        error={error}
        onCardClick={handleCardClick}
        onResetFilters={resetFilters}
        onRetry={loadCards}
      />
    </div>
  );
}
