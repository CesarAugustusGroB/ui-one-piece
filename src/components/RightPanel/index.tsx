import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { CostCurve } from './CostCurve';
import './RightPanel.css';

export function RightPanel() {
  const decks = useStore((state) => state.decks);
  const activeDeckId = useStore((state) => state.activeDeckId);
  const removeCardFromDeck = useStore((state) => state.removeCardFromDeck);

  const activeDeck = useMemo(() => {
    return decks.find((d) => d.id === activeDeckId) ?? null;
  }, [decks, activeDeckId]);

  const deckCards = activeDeck?.cards ?? [];
  const maxCards = 51;

  const totalCards = useMemo(() => {
    return deckCards.reduce((sum, dc) => sum + dc.quantity, 0);
  }, [deckCards]);

  const costDistribution = useMemo(() => {
    const distribution = new Array(11).fill(0);
    deckCards.forEach((dc) => {
      const costIndex = Math.min(dc.card.cost, 10);
      distribution[costIndex] += dc.quantity;
    });
    return distribution;
  }, [deckCards]);

  return (
    <div className="right-panel-content">
      {/* Deck Header */}
      <div className="deck-header">
        <div className="deck-header-title">
          <span>Deck</span>
          <span className="deck-count">{totalCards} / {maxCards}</span>
        </div>
        <div className="deck-progress">
          <div
            className="deck-progress-fill"
            style={{ width: `${(totalCards / maxCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Deck List */}
      <div className="deck-list">
        {deckCards.length === 0 ? (
          <div className="deck-empty">
            <p>No cards in deck</p>
            <p className="deck-empty-hint">Click cards to add them</p>
          </div>
        ) : (
          deckCards.map((deckCard) => (
            <div key={deckCard.card.id} className="deck-list-item">
              <div className="deck-card-thumb">
                <img src={deckCard.card.imageUrl} alt={deckCard.card.name} />
              </div>
              <span className="deck-card-name">{deckCard.card.name}</span>
              <span className="deck-card-quantity">×{deckCard.quantity}</span>
              <button
                className="btn-icon deck-card-remove"
                title="Remove"
                onClick={() => removeCardFromDeck(deckCard.card.id)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Cost Curve */}
      <div className="deck-stats">
        <span className="panel-label">Cost Curve</span>
        <CostCurve distribution={costDistribution} />
      </div>
    </div>
  );
}
