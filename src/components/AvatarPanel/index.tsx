import {
	Avatar,
	AvatarGroup,
	Flex,
	FormControl,
	FormHelperText,
	Input,
	Stack,
} from "@chakra-ui/react";
import { supabase } from "@client/supabase.ts";
import { Z_INDEX } from "@constants/index.ts";
import { type User, cursorsAtom, meAtom, usersAtom } from "@state/User";
import { useAtom } from "jotai";
import type React from "react";
import { useEffect } from "react";

export const AvatarPanel: React.FC = () => {
	const [users, setUsers] = useAtom(usersAtom);
	const [_, setCursors] = useAtom(cursorsAtom);
	const [me, setMe] = useAtom(meAtom);
	console.log(me);
	const userNameChannel = supabase.channel("userName", {
		config: {
			presence: {
				key: me.id,
			},
		},
	});
	userNameChannel
		.on("broadcast", { event: "update" }, ({ payload }) => {
			setUsers((prev) => prev.set(payload.user.id, payload.user));
			console.log("update", users);
		})
		.subscribe();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const room = supabase.channel("room", {
			config: {
				presence: {
					key: me.id,
				},
			},
		});

		room
			.on<User>("presence", { event: "join" }, ({ key, newPresences }) => {
				// 自身は除外
				if (key === me.id) return;
				setUsers(users.set(key, newPresences[0]));
			})
			.on("presence", { event: "leave" }, ({ key }) => {
				console.log("leave");
				users.delete(key);
				setUsers(users);
				setCursors((prev) => {
					prev.delete(key);
					return prev;
				});
			})
			.subscribe(async (status) => {
				if (status !== "SUBSCRIBED") {
					return;
				}
				await room.track(me);
			});
	}, []);

	return (
		<>
			<Stack
				position={"fixed"}
				top={0}
				right={5}
				h={"150px"}
				rounded="base"
				boxShadow="md"
				m={4}
				p={4}
				justifyContent={"space-between"}
				flexDirection={"column"}
				zIndex={Z_INDEX.TOOLS}
			>
				<>
					<AvatarGroup size="md" max={5}>
						{[...users].map(([key, { name, color }]) => {
							return <Avatar title={name} key={key} name={name} bg={color} />;
						})}
					</AvatarGroup>
					<Flex gap={4}>
						<FormControl>
							<Input
								variant="filled"
								placeholder="Your Name"
								value={me.name}
								size="sm"
								onChange={(e) =>
									setMe((prev) => ({ ...prev, name: e.target.value }))
								}
								onBlur={async () => {
									await userNameChannel.send({
										type: "broadcast",
										event: "update",
										payload: {
											user: me,
										},
									});
								}}
							/>
							<FormHelperText>Please enter your name.</FormHelperText>
						</FormControl>
					</Flex>
				</>
			</Stack>
		</>
	);
};
