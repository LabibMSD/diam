import { Controller, OnStart } from "@flamework/core";
import { createBroadcastReceiver } from "@rbxts/reflex";
import { Events } from "client/network";
import { rootProducer } from "client/store";

@Controller()
export class NetworkSyncController implements OnStart {
	private readonly receiver = createBroadcastReceiver({
		start: () => {
			Events.reflex.start.fire();
		},
	});

	public onStart(): void {
		rootProducer.applyMiddleware(this.receiver.middleware);

		Events.reflex.dispatch.connect((actions) => {
			this.receiver.dispatch(actions);
		});
	}
}
