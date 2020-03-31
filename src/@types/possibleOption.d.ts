import Position from "./position";

export default interface PossibleOption {
  name: string;
  time: number;
  position: Position;
}