import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "client/network";

@Component({ tag: "Pickaxe" })
export class PickaxeComponent extends BaseComponent<{}, Tool> implements OnStart {
	onStart(): void {
		this.instance.Activated.Connect(() => {
			const character = this.instance.Parent as Model;
			if (!character || !character.IsA("Model")) return;

			const player = Players.GetPlayerFromCharacter(character);
			if (!player) return;

			const rootPart = character.FindFirstChild("HumanoidRootPart") as Part;
			if (!rootPart) return;

			const raycastParams = new RaycastParams();
			raycastParams.ExcludeInstances = [character];

			const result = Workspace.Raycast(rootPart.Position, new Vector3(0, -5, 0), raycastParams);
			if (!result) return;

			const mineableObject = result.Instance;
			if (!mineableObject.IsA("Part") || !mineableObject.HasTag("Mineable")) return;

			Events.mining.mineObject.fire(mineableObject);
		});
	}
}
