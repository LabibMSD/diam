import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { ReflexProvider } from "@rbxts/react-reflex";
import { rootProducer } from "./store";
import { App } from "./ui/app.ui";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
const root = createRoot(new Instance("Folder"));

root.render(
	<StrictMode>
		<ReflexProvider producer={rootProducer}>{createPortal(<App />, playerGui)}</ReflexProvider>
	</StrictMode>,
);
