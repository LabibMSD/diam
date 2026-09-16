export interface PlayerSettings {
	musicVolume: number;
	sfxVolume: number;
}

export interface PlayerBalances {
	coin: number;
	ore: number;
	multiplier: number;
}

export interface PlayerData {
	dataVersion: number;
	settings: PlayerSettings;
	balances: PlayerBalances;
}

export const DEFAULT_PLAYER_DATA: PlayerData = {
	dataVersion: 0,
	settings: {
		musicVolume: 0.5,
		sfxVolume: 0.5,
	},
	balances: {
		coin: 0,
		ore: 0,
		multiplier: 0,
	},
};
