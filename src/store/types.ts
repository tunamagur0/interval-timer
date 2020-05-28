export interface RootState {
  left: number;
  right: number;
}

export type ID = "left" | "right";

export interface Timer {
  id: ID;
  time: number;
}
