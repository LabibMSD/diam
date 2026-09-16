import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { App } from "./ui/app";
import { ReflexProvider } from "@rbxts/react-reflex";
import { rootProducer } from "./store";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui
const root = createRoot(new Instance("Folder"));

root.render(
	<StrictMode>
		<ReflexProvider producer={rootProducer}>
			{createPortal(<screengui><App /></screengui>, playerGui)}
		</ReflexProvider>
	</StrictMode>,
);