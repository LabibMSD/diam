# Structure Folder

src/
├── client/
│   ├── controllers/
│   ├── components/
│   ├── ui/
│   │   ├── hooks/
│   │   ├── components/
│   └── store/
│       └── slices/
│
├── server/
│   ├── services/
│   ├── components/
│   └── store/
│       └── slices/
│
├── shared/
│   ├── store/
│   │   └── slices/
│   ├── types/
│   ├── configs/
│   └── utils/
│
└── types/

# Convention Name

1. Folder Naming
Folder	Convention	Contoh
Semua nama folder	kebab-case, plural kalau isinya kumpulan sejenis	services/, controllers/, components/, hooks/, slices/, types/, configs/, utils/, screens/
Folder fitur/domain (grouping)	kebab-case, boleh singular kalau representasi satu domain	shop/, inventory/, hud/

2. File Naming
Tipe File	Convention	Contoh
Flamework Service	kebab-case.service.ts	player-data.service.ts
Flamework Controller	kebab-case.controller.ts	input.controller.ts
Flamework Component	kebab-case.component.ts	damageable.component.ts
React component (screen/feature)	kebab-case.tsx	shop-screen.tsx
React component (reusable/dumb)	kebab-case.tsx	button.tsx
React hook	use-kebab-case.ts	use-player-data.ts
Reflex producer/slice (client/server)	kebab-case.slice.ts	player.slice.ts
Reflex reducer (shared, pure function)	kebab-case.slice.ts (folder beda: shared/store/slices/)	player.slice.ts
Types/interfaces file	kebab-case.ts	player-data.ts
Configs/data statis	kebab-case.config.ts	items.config.ts
Guard file	kebab-case.ts (nama sesuai isi, misal general guards.ts)	guards.ts
Network definition	kebab-case.ts	network.ts
Util/helper file	kebab-case.ts atau kebab-case-util.ts kalau perlu spesifik	math-util.ts, promise-r15.ts

3. Kode — Class, Interface, Type, Enum
Elemen	Convention	Contoh
Class (Service/Controller/Component)	PascalCase	class PlayerDataService
Interface	PascalCase, tanpa prefix I	interface PlayerData
Type alias	PascalCase	type ItemId = string
Enum	PascalCase, member PascalCase	enum CurrencyType { Coin, Gem }
React props interface	PascalCase + suffix Props	interface ShopScreenProps
Generic type parameter	Single uppercase letter, atau PascalCase deskriptif kalau kompleks	T, TState, TPayload

4. Kode — Function & Variable
Elemen	Convention	Contoh
Function/method	camelCase, verb pertama	function getPlayerLevel()
Variable	camelCase	const playerProfile = ...
Property object/interface	camelCase	coin: number, musicVolume: number
Boolean variable/property	camelCase, prefix is/has/should/can	isLoaded, hasPermission, canPurchase
Constant lokal (di dalam function, bisa berubah scope)	camelCase	const amount = 100
Constant global/config (truly immutable, module-level)	SCREAMING_SNAKE_CASE	const MAX_INVENTORY_SIZE = 50, const DEFAULT_PLAYER_DATA = {...}
React component function	PascalCase	function ShopScreen()
React hook	camelCase, prefix use	useCoins(), usePlayerData()
Reflex producer variable	camelCase, suffix jelas	const playerProducer, const rootProducer
Reflex reducer object (shared)	camelCase, suffix Reducers	const playerReducers = {...}
Reflex action (function di dalam reducer)	camelCase, verb pertama	addCoins, loadPlayerData, unloadPlayerData
Network event/function (Flamework)	camelCase, verb pertama	purchaseItem, requestDailyReward
Roblox Instance reference (variable)	camelCase, noun jelas	const humanoidRootPart, const shopButton
t type guard variable	camelCase, suffix Guard	const playerDataGuard, const purchaseRequestGuard

5. Kode — Khusus Private/Internal
Elemen	Convention	Contoh
Private class property/method	camelCase, prefix private keyword (TS), tanpa underscore	private readonly profileStore = ...
Internal-only export (dipakai dalam module sendiri)	Sama kayak biasa, gak ada prefix khusus	-

(Catatan: sebagian style guide pakai underscore prefix _privateVar untuk private property, tapi karena TypeScript punya keyword private asli, lebih baik gak usah pakai underscore — biar gak redundant/inconsistent.)

6. Singular vs Plural — aturan cepat
Konteks	Aturan
Folder isi banyak file sejenis	Plural (services/, hooks/, slices/)
Interface/type merepresentasikan satu entity	Singular (PlayerData, bukan PlayersData)
Interface/type merepresentasikan koleksi	Plural atau eksplisit Record<key, Value> (profiles: Record<number, PlayerState>)
Variable array/list	Plural (const items: Item[], bukan const item: Item[])