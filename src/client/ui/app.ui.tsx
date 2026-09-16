import React from "@rbxts/react";
import { Mine } from "./mine/mine.ui";

export function App() {
	return (
		<screengui ResetOnSpawn IgnoreGuiInset>
			<Mine />
		</screengui>
	);
}
