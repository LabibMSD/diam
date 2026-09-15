import { t } from "@rbxts/t";

export const playerSettingsGuard = t.interface({
	musicVolume: t.number,
	sfxVolume: t.number,
});

export const playerDataGuard = t.interface({
	dataVersion: t.integer,
	settings: playerSettingsGuard,
});
