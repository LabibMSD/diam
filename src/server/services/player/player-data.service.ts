import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Trove } from "@rbxts/trove";
import { DEFAULT_PLAYER_DATA, PlayerData } from "shared/types/player-data";
import { playerDataGuard } from "shared/utils/guard";
import { rootProducer } from "server/store";
import { DataStoreService } from "../core/data-store.service";
import { Dictionary } from "@rbxts/sift";

type PlayerProfile = ReturnType<DataStoreService["playerStore"]["StartSessionAsync"]>;

@Service()
export class PlayerDataService implements OnStart {
	private readonly activeProfiles = new Map<Player, NonNullable<PlayerProfile>>();
	private readonly playerTroves = new Map<Player, Trove>();

	constructor(private readonly dataStore: DataStoreService) {}

	public onStart(): void {
		Players.PlayerAdded.Connect((player) => this.loadPlayer(player));
		Players.PlayerRemoving.Connect((player) => this.unloadPlayer(player));

		for (const player of Players.GetPlayers()) {
			task.spawn(() => this.loadPlayer(player));
		}
	}

	private loadPlayer(player: Player): void {
		const profile = this.dataStore.playerStore.StartSessionAsync(`${player.UserId}`, {
			Cancel: () => player.Parent !== Players,
		});

		if (profile === undefined) {
			player.Kick("Data gagal dimuat, silakan rejoin.");
			return;
		}

		profile.AddUserId(player.UserId);

		this.migrateData(profile.Data);
		profile.Reconcile();

		if (player.Parent !== Players) {
			profile.EndSession();
			return;
		}

		if (!playerDataGuard(profile.Data)) {
			warn(`[PlayerDataService] Data ${player.Name} korup, reset ke default.`);
			profile.Data = Dictionary.mergeDeep(DEFAULT_PLAYER_DATA, profile.Data as Partial<PlayerData>) as PlayerData;
		}

		this.setupPlayerState(player, profile);
	}

	private unloadPlayer(player: Player): void {
		this.activeProfiles.get(player)?.EndSession();
	}

	private migrateData(rawData: unknown): void {
		const data = rawData as Record<string, unknown>;

		if (data["dataVersion"] === undefined) {
			data["dataVersion"] = 0;
		}
	}

	private setupPlayerState(player: Player, profile: NonNullable<PlayerProfile>): void {
		this.activeProfiles.set(player, profile);
		rootProducer.loadPlayerData(player.UserId, profile.Data as PlayerData);

		const trove = new Trove();
		this.playerTroves.set(player, trove);

		trove.add(
			rootProducer.subscribe(
				(state) => state.player.profiles[player.UserId],
				(data) => {
					if (data !== undefined) {
						profile.Data = data;
					}
				},
			),
		);

		trove.add(() => rootProducer.unloadPlayerData(player.UserId));

		trove.add(() => {
			this.activeProfiles.delete(player);
			this.playerTroves.delete(player);
		});

		trove.add(
			profile.OnSessionEnd.Connect(() => {
				player.Kick("Sesi data berakhir, silakan rejoin.");
				trove.clean();
			}),
		);
	}
}
