export interface Card {
  id: string;
  name: string;
  cost: number;
  power?: number;
  counter?: number;
  color: CardColor;
  type: CardType;
  attribute?: string;
  effect?: string;
  trigger?: string;
  imageUrl: string;
  cardNumber: string;
  rarity: string;
  set: string;
}

export type CardColor = 'red' | 'green' | 'blue' | 'purple' | 'black' | 'yellow' | 'multi';

export type CardType = 'leader' | 'character' | 'event' | 'stage';

export interface DeckCard {
  card: Card;
  quantity: number;
}

export interface Deck {
  id: string;
  name: string;
  leader: Card | null;
  cards: DeckCard[];
  createdAt: number;
  updatedAt: number;
}

export interface Filters {
  color: string;
  cost: string;
  type: string;
  sort: string;
  search: string;
}
