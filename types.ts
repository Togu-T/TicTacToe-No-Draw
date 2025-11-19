export type Player = 'X' | 'O';

export type GameState = 'MENU' | 'PLAYING' | 'GAME_OVER';

export interface Scores {
  X: number;
  O: number;
}

// Tracks the move index (0-8) in the order they were placed
export type MoveQueue = number[];

export interface WinState {
  winner: Player | null;
  line: number[] | null;
}