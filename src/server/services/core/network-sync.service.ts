import { Service, OnStart } from "@flamework/core";
import { createBroadcaster } from "@rbxts/reflex";
import { Trove } from "@rbxts/trove";
import { Events } from "server/network";
import { rootProducer, slices } from "server/store";

@Service()
export class NetworkSyncService implements OnStart {
	private readonly broadcaster = createBroadcaster({
		producers: slices,
		dispatch: (player, actions) => {
			Events.reflex.dispatch.fire(player, actions);
		},
	});

	public onStart(): void {
		rootProducer.applyMiddleware(this.broadcaster.middleware);

		Events.reflex.start.connect((player) => {
			this.broadcaster.start(player);
		});
	}
}
