import { PlayerData } from "shared/types/player-data";

export interface PlayerSliceState {
	readonly profiles: Readonly<Record<string, PlayerData | undefined>>;
}

export const INITIAL_PLAYER_STATE: PlayerSliceState = {
	profiles: {},
};

export const playerReducers = {
	loadPlayerData: (state: PlayerSliceState, userId: number, data: PlayerData): PlayerSliceState => ({
		...state,
		profiles: { ...state.profiles, [userId]: data },
	}),

	unloadPlayerData: (state: PlayerSliceState, userId: number): PlayerSliceState => {
		const profiles = { ...state.profiles };
		delete profiles[userId];
		return { ...state, profiles };
	},

	setMusicVolume: (state: PlayerSliceState, userId: number, volume: number): PlayerSliceState => {
		const profile = state.profiles[userId];
		if (!profile) return state;

		return {
			...state,
			profiles: {
				...state.profiles,
				[userId]: { ...profile, settings: { ...profile.settings, musicVolume: volume } },
			},
		};
	},

	setSfxVolume: (state: PlayerSliceState, userId: number, volume: number): PlayerSliceState => {
		const profile = state.profiles[userId];
		if (!profile) return state;

		return {
			...state,
			profiles: {
				...state.profiles,
				[userId]: { ...profile, settings: { ...profile.settings, sfxVolume: volume } },
			},
		};
	},
};
