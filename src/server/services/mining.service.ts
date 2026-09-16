import { Components } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { MineableComponent } from "server/components/mineable.component";
import { Events } from "server/network";
import { rootProducer } from "server/store";
import { selectPlayerProfile } from "shared/store/selectors";

@Service()
export class MiningService implements OnStart {
	constructor(private components: Components) {}

	onStart(): void {
		this.onMineObject();
		this.onUpgradeMultiplier();
		this.onSellAllOre();
	}

	private onMineObject() {
		Events.mining.mineObject.connect((player, mineableObject) => {
			if (!mineableObject || !mineableObject.IsA("Part")) return;

			const character = player.Character;
			if (!character) return;

			const rootPart = character.FindFirstChild("HumanoidRootPart") as Part;
			if (!rootPart) return;

			const orePosition = mineableObject.Position;
			const playerPosition = rootPart.Position;

			const distance = playerPosition.sub(orePosition).Magnitude;

			if (distance > 5) return;

			const mineableComponent = this.components.getComponent<MineableComponent>(mineableObject);
			if (!mineableComponent) return;

			if (mineableComponent.isMined) return;

			mineableComponent.mine();
			rootProducer.addOre(player.UserId, 1);
		});
	}

	private onUpgradeMultiplier() {
		Events.mining.upgradeMultiplier.connect((player) => {
			const userId = player.UserId;

			const coin = rootProducer.getState((state) => selectPlayerProfile(state, userId)?.balances.coin);
			if (!coin || coin <= 0) return;

			rootProducer.upgradeMultiplier(userId);
		});
	}

	private onSellAllOre() {
		Events.mining.sellAllOre.connect((player) => {
			const userId = player.UserId;

			const ore = rootProducer.getState((state) => selectPlayerProfile(state, userId)?.balances.ore);
			if (!ore || ore <= 0) return;

			rootProducer.sellAllOre(userId);
		});
	}
}
