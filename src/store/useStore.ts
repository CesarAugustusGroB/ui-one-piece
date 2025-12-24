import { create } from 'zustand';
import type { Card, Deck, Filters } from '../types';

interface Store {
  // Cards
  cards: Card[];
  loading: boolean;
  error: string | null;
  loadCards: () => Promise<void>;

  // Filters
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  getFilteredCards: () => Card[];

  // Decks
  decks: Deck[];
  activeDeckId: string | null;
  setActiveDeck: (id: string) => void;
  createDeck: (name: string) => void;
  deleteDeck: (id: string) => void;
  renameDeck: (id: string, name: string) => void;

  // Deck Cards
  addCardToDeck: (card: Card) => void;
  removeCardFromDeck: (cardId: string) => void;
  updateCardQuantity: (cardId: string, quantity: number) => void;
  getActiveDeck: () => Deck | null;
  getDeckCardCount: () => number;
  getCostDistribution: () => number[];

  // Import/Export
  exportDeckToText: () => string;
  importDeckFromText: (text: string) => { success: boolean; error?: string };
}

const defaultFilters: Filters = {
  color: 'all',
  cost: 'any',
  type: 'all',
  sort: 'name',
  search: '',
};

// Mock cards for demo
const mockCards: Card[] = [
  {
    id: '1',
    name: 'Monkey D. Luffy',
    cost: 5,
    power: 6000,
    color: 'red',
    type: 'character',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/C9A962?text=Luffy',
    cardNumber: 'ST01-001',
    rarity: 'L',
    set: 'ST01',
  },
  {
    id: '2',
    name: 'Roronoa Zoro',
    cost: 3,
    power: 5000,
    color: 'green',
    type: 'character',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/4ADE80?text=Zoro',
    cardNumber: 'ST01-002',
    rarity: 'SR',
    set: 'ST01',
  },
  {
    id: '3',
    name: 'Nami',
    cost: 2,
    power: 3000,
    color: 'blue',
    type: 'character',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/5ECDC9?text=Nami',
    cardNumber: 'ST01-003',
    rarity: 'R',
    set: 'ST01',
  },
  {
    id: '4',
    name: 'Usopp',
    cost: 2,
    power: 2000,
    color: 'yellow',
    type: 'character',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/F4F4F5?text=Usopp',
    cardNumber: 'ST01-004',
    rarity: 'C',
    set: 'ST01',
  },
  {
    id: '5',
    name: 'Sanji',
    cost: 4,
    power: 5000,
    color: 'red',
    type: 'character',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/E85454?text=Sanji',
    cardNumber: 'ST01-005',
    rarity: 'SR',
    set: 'ST01',
  },
  {
    id: '6',
    name: 'Gum-Gum Pistol',
    cost: 1,
    color: 'red',
    type: 'event',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/E85454?text=Event',
    cardNumber: 'ST01-006',
    rarity: 'C',
    set: 'ST01',
  },
  {
    id: '7',
    name: 'Tony Tony Chopper',
    cost: 1,
    power: 1000,
    color: 'green',
    type: 'character',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/4ADE80?text=Chopper',
    cardNumber: 'ST01-007',
    rarity: 'C',
    set: 'ST01',
  },
  {
    id: '8',
    name: 'Nico Robin',
    cost: 4,
    power: 4000,
    color: 'purple',
    type: 'character',
    imageUrl: 'https://via.placeholder.com/200x280/252A35/A78BFA?text=Robin',
    cardNumber: 'ST01-008',
    rarity: 'R',
    set: 'ST01',
  },
];

const createEmptyDeck = (name: string): Deck => ({
  id: crypto.randomUUID(),
  name,
  leader: null,
  cards: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export const useStore = create<Store>((set, get) => ({
  // Cards
  cards: mockCards,
  loading: false,
  error: null,

  loadCards: async () => {
    set({ loading: true, error: null });
    try {
      // In production, this would fetch from an API
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ cards: mockCards, loading: false });
    } catch {
      set({ error: 'Failed to load cards', loading: false });
    }
  },

  // Filters
  filters: defaultFilters,

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  getFilteredCards: () => {
    const { cards, filters } = get();
    let result = [...cards];

    // Filter by color
    if (filters.color !== 'all') {
      result = result.filter((card) => card.color === filters.color);
    }

    // Filter by cost
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

    // Filter by type
    if (filters.type !== 'all') {
      result = result.filter((card) => card.type === filters.type);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (card) =>
          card.name.toLowerCase().includes(searchLower) ||
          card.cardNumber.toLowerCase().includes(searchLower)
      );
    }

    // Sort
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
  },

  // Decks
  decks: [createEmptyDeck('My First Deck')],
  activeDeckId: null,

  setActiveDeck: (id) => {
    set({ activeDeckId: id });
  },

  createDeck: (name) => {
    const newDeck = createEmptyDeck(name);
    set((state) => ({
      decks: [...state.decks, newDeck],
      activeDeckId: newDeck.id,
    }));
  },

  deleteDeck: (id) => {
    set((state) => {
      const newDecks = state.decks.filter((d) => d.id !== id);
      return {
        decks: newDecks,
        activeDeckId:
          state.activeDeckId === id
            ? newDecks[0]?.id ?? null
            : state.activeDeckId,
      };
    });
  },

  renameDeck: (id, name) => {
    set((state) => ({
      decks: state.decks.map((d) =>
        d.id === id ? { ...d, name, updatedAt: Date.now() } : d
      ),
    }));
  },

  // Deck Cards
  addCardToDeck: (card) => {
    set((state) => {
      const { activeDeckId, decks } = state;
      if (!activeDeckId) return state;

      return {
        decks: decks.map((deck) => {
          if (deck.id !== activeDeckId) return deck;

          const existingCard = deck.cards.find((dc) => dc.card.id === card.id);
          if (existingCard) {
            // Max 4 copies
            if (existingCard.quantity >= 4) return deck;
            return {
              ...deck,
              cards: deck.cards.map((dc) =>
                dc.card.id === card.id
                  ? { ...dc, quantity: dc.quantity + 1 }
                  : dc
              ),
              updatedAt: Date.now(),
            };
          }

          return {
            ...deck,
            cards: [...deck.cards, { card, quantity: 1 }],
            updatedAt: Date.now(),
          };
        }),
      };
    });
  },

  removeCardFromDeck: (cardId) => {
    set((state) => {
      const { activeDeckId, decks } = state;
      if (!activeDeckId) return state;

      return {
        decks: decks.map((deck) => {
          if (deck.id !== activeDeckId) return deck;

          const existingCard = deck.cards.find((dc) => dc.card.id === cardId);
          if (!existingCard) return deck;

          if (existingCard.quantity > 1) {
            return {
              ...deck,
              cards: deck.cards.map((dc) =>
                dc.card.id === cardId
                  ? { ...dc, quantity: dc.quantity - 1 }
                  : dc
              ),
              updatedAt: Date.now(),
            };
          }

          return {
            ...deck,
            cards: deck.cards.filter((dc) => dc.card.id !== cardId),
            updatedAt: Date.now(),
          };
        }),
      };
    });
  },

  updateCardQuantity: (cardId, quantity) => {
    set((state) => {
      const { activeDeckId, decks } = state;
      if (!activeDeckId) return state;

      return {
        decks: decks.map((deck) => {
          if (deck.id !== activeDeckId) return deck;

          if (quantity <= 0) {
            return {
              ...deck,
              cards: deck.cards.filter((dc) => dc.card.id !== cardId),
              updatedAt: Date.now(),
            };
          }

          return {
            ...deck,
            cards: deck.cards.map((dc) =>
              dc.card.id === cardId
                ? { ...dc, quantity: Math.min(quantity, 4) }
                : dc
            ),
            updatedAt: Date.now(),
          };
        }),
      };
    });
  },

  getActiveDeck: () => {
    const { activeDeckId, decks } = get();
    return decks.find((d) => d.id === activeDeckId) ?? null;
  },

  getDeckCardCount: () => {
    const deck = get().getActiveDeck();
    if (!deck) return 0;
    return deck.cards.reduce((sum, dc) => sum + dc.quantity, 0);
  },

  getCostDistribution: () => {
    const deck = get().getActiveDeck();
    const distribution = new Array(11).fill(0); // 0-10+

    if (!deck) return distribution;

    deck.cards.forEach((dc) => {
      const costIndex = Math.min(dc.card.cost, 10);
      distribution[costIndex] += dc.quantity;
    });

    return distribution;
  },

  // Import/Export
  exportDeckToText: () => {
    const deck = get().getActiveDeck();
    if (!deck) return '';

    const lines: string[] = [];

    // Add deck name as header
    lines.push(`// ${deck.name}`);
    lines.push('');

    // Add each card
    deck.cards.forEach((dc) => {
      lines.push(`${dc.quantity}x ${dc.card.name} (${dc.card.cardNumber})`);
    });

    return lines.join('\n');
  },

  importDeckFromText: (text: string) => {
    const { cards, activeDeckId } = get();
    if (!activeDeckId) {
      return { success: false, error: 'No active deck selected' };
    }

    const lines = text.split('\n').filter((line) => line.trim() && !line.startsWith('//'));
    const cardPattern = /^(\d+)x\s+(.+?)\s+\(([^)]+)\)$/;
    const importedCards: { card: Card; quantity: number }[] = [];

    for (const line of lines) {
      const match = line.trim().match(cardPattern);
      if (!match) continue;

      const [, quantityStr, , cardNumber] = match;
      const quantity = parseInt(quantityStr, 10);

      // Find card by card number
      const card = cards.find((c) => c.cardNumber === cardNumber);
      if (card) {
        importedCards.push({ card, quantity: Math.min(quantity, 4) });
      }
    }

    if (importedCards.length === 0) {
      return { success: false, error: 'No valid cards found in import text' };
    }

    // Update the active deck with imported cards
    set((state) => ({
      decks: state.decks.map((deck) => {
        if (deck.id !== activeDeckId) return deck;
        return {
          ...deck,
          cards: importedCards,
          updatedAt: Date.now(),
        };
      }),
    }));

    return { success: true };
  },
}));
