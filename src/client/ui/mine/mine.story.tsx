import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import { Mine } from "./mine.ui";

export = CreateReactStory(
	{
		react: React,
		reactRoblox: ReactRoblox,
	},
	() => <Mine />,
);
