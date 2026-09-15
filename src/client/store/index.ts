import { combineProducers } from "@rbxts/reflex";
import { playerSlice } from "./slices/player.slice";

export const slices = {
	player: playerSlice,
};

export const rootProducer = combineProducers(slices);
export type RootState = ReturnType<typeof rootProducer.getState>;
