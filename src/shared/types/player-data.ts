export interface PlayerSettings {
	musicVolume: number;
	sfxVolume: number;
}

export interface PlayerData {
	dataVersion: number;
	settings: PlayerSettings;
}

export const DEFAULT_PLAYER_DATA: PlayerData = {
	dataVersion: 0,
	settings: {
		musicVolume: 0.5,
		sfxVolume: 0.5,
	},
};
