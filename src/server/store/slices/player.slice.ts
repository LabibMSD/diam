import { createProducer } from "@rbxts/reflex";
import { playerReducers, INITIAL_PLAYER_STATE } from "shared/store/slices/player.slice";

export const playerProducer = createProducer(INITIAL_PLAYER_STATE, playerReducers);
