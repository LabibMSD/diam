import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { selectPlayerProfile } from "shared/store/selectors";

export function Mine() {
	const userId = Players.LocalPlayer.UserId;

	const coin = useSelector((state) => selectPlayerProfile(state, userId)?.balances.coin) ?? 0;
	const ore = useSelector((state) => selectPlayerProfile(state, userId)?.balances.ore) ?? 0;
	const multiplier = useSelector((state) => selectPlayerProfile(state, userId)?.balances.multiplier) ?? 1;

	// const coin = 1;
	// const ore = 1;
	// const multiplier = 1;

	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0)}
			Position={new UDim2(0.5, 0, 0, 0)}
			Size={new UDim2(0.15, 0, 0.2, 0)}
			BackgroundTransparency={1}
		>
			<textlabel Text={`Coin: ${coin}`} Size={new UDim2(1, 0, 0.25, 0)} />
			<textlabel Text={`Ore: ${ore}`} Size={new UDim2(1, 0, 0.25, 0)} />
			<textlabel Text={`Multiplier: ${multiplier}`} Size={new UDim2(1, 0, 0.25, 0)} />
			<frame Size={new UDim2(1, 0, 0.5, 0)}>
				<textbutton
					TextWrap
					Text={`Upgrade Multiplier`}
					Size={new UDim2(0.5, 0, 1, 0)}
					Event={{
						MouseButton1Click: () => {
							Events.mining.upgradeMultiplier.fire();
						},
					}}
				/>
				<textbutton
					Text={`Sell Ore`}
					Size={new UDim2(0.5, 0, 1, 0)}
					Event={{
						MouseButton1Click: () => {
							Events.mining.sellAllOre.fire();
						},
					}}
				/>
				<uilistlayout FillDirection={"Horizontal"} />
			</frame>
			<uilistlayout Padding={new UDim(0, 0)} />
		</frame>
	);
}
