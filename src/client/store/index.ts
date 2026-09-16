import { combineProducers } from "@rbxts/reflex";
import { playerProducer } from "./slices/player.slice";

export const slices = {
	player: playerProducer,
};

export const rootProducer = combineProducers(slices);
export type RootState = ReturnType<typeof rootProducer.getState>;
