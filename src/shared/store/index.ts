import { PlayerSliceState } from "./slices/player.slice";

export type SharedState = {
    player: PlayerSliceState;
}