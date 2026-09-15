import { Service } from "@flamework/core";
import ProfileStore from "@rbxts/profile-store";
import { DEFAULT_PLAYER_DATA } from "shared/types/player-data";

@Service()
export class DataStoreService {
	public readonly playerStore = ProfileStore.New("PlayerData", DEFAULT_PLAYER_DATA);

	// public readonly globalMarketStore = ProfileStore.New("GlobalMarket", DEFAULT_MARKET_DATA);
}
