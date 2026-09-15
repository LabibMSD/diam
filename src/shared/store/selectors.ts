import { SharedState } from "shared/store";

export const selectPlayerProfile = (state: SharedState, userId: number) => state.player.profiles[userId];
