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

	addCoin: (state: PlayerSliceState, userId: number, coin: number): PlayerSliceState => {
		const profile = state.profiles[userId];
		if (!profile) return state;

		return {
			...state,
			profiles: {
				...state.profiles,
				[userId]: { ...profile, balances: { ...profile.balances, coin: profile.balances.coin + coin } },
			},
		};
	},

	addOre: (state: PlayerSliceState, userId: number, ore: number): PlayerSliceState => {
		const profile = state.profiles[userId];
		if (!profile) return state;

		return {
			...state,
			profiles: {
				...state.profiles,
				[userId]: { ...profile, balances: { ...profile.balances, ore: profile.balances.ore + ore } },
			},
		};
	},

	addMultiplier: (state: PlayerSliceState, userId: number, multiplier: number): PlayerSliceState => {
		const profile = state.profiles[userId];
		if (!profile) return state;

		return {
			...state,
			profiles: {
				...state.profiles,
				[userId]: {
					...profile,
					balances: { ...profile.balances, multiplier: profile.balances.multiplier + multiplier },
				},
			},
		};
	},

	upgradeMultiplier: (state: PlayerSliceState, userId: number) => {
		const profile = state.profiles[userId];
		if (!profile) return state;

		const coin = profile.balances.coin;
		if (coin <= 0) return state;

		return {
			...state,
			profiles: {
				...state.profiles,
				[userId]: {
					...profile,
					balances: { ...profile.balances, multiplier: profile.balances.multiplier + 1, coin: 0 },
				},
			},
		};
	},

	sellAllOre: (state: PlayerSliceState, userId: number) => {
		const profile = state.profiles[userId];
		if (!profile) return state;

		const ore = profile.balances.ore;
		if (ore <= 0) return state;

		return {
			...state,
			profiles: {
				...state.profiles,
				[userId]: {
					...profile,
					balances: {
						...profile.balances,
						coin: profile.balances.coin + profile.balances.ore * profile.balances.multiplier,
						ore: 0,
					},
				},
			},
		};
	},
};
