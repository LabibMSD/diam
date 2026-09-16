import { BaseComponent, Component } from "@flamework/components";

@Component({ tag: "Mineable" })
export class MineableComponent extends BaseComponent<{}, Part> {
	public isMined = false;

	public mine() {
		if (this.isMined) return;

		this.instance.Transparency = 1;
		this.instance.CanCollide = false;
		this.isMined = true;

		task.delay(3, () => {
			this.instance.Transparency = 0;
			this.instance.CanCollide = true;
			this.isMined = false;
		});
	}
}
