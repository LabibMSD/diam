import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { App } from "./ui/app";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui
const root = createRoot(new Instance("Folder"));

root.render(<StrictMode>{createPortal(<screengui><App /></screengui>, playerGui)}</StrictMode>);