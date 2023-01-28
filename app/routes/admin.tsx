import React from 'react';
import {authenticator} from 'app/core/services/auth/role/admin/config.server';
import {AiFillQuestionCircle, AiFillRest} from 'react-icons/ai';
import {BsFillTreeFill} from 'react-icons/bs';
import {FiHome, FiUsers} from 'react-icons/fi';

import {Form, Outlet, useLoaderData} from '@remix-run/react';
import type {LoaderArgs, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';

import {
	Box,
	Button,
	HStack,
	Menu,
	MenuButton,
	Spacer,
	Stack,
	Text
} from '@chakra-ui/react';

import {AppShell} from '@saas-ui/pro';
import {NavGroup, Sidebar, SidebarSection} from '@saas-ui/sidebar';

import {getBranches} from 'app/domains/app/branches/get-branch';

export const meta: MetaFunction = () => {
	return {
		title: 'ADMIN'
	};
};

/**
 * LOADER
 */
export async function loader({request}: LoaderArgs) {
	const admin = await authenticator.isAuthenticated(request);
	const branchesRaw = await getBranches();
	const branches = branchesRaw.data.branches;

	return json({
		user: admin,
		branches: branches
	});
}

/**
 * VIEW
 * @constructor
 */
export default function PageRoute() {
	const data = useLoaderData<typeof loader>();

	//console.log("VIEW")
	//console.log(data);

	return (
		<>
			<AppShell
				variant="static"
				height="100%"
				sidebar={
					<Sidebar
						height="100%"
						width={'400px'}
						bgColor={'#e8e8e8'}
						motionPreset="none"
						border={'none'}>
						<SidebarSection
							direction="row"
							mt={'40'}>
							{/*<SaasUILogo/>*/}
						</SidebarSection>

						<SidebarSection direction="row">
							<Menu>
								<Stack>
									<Text fontSize="md">
										{data.admin ? (
											<>
												{data.admin.admin.AdminProfile.firstName}{' '}
												{data.admin.admin.AdminProfile.lastName}
												{data.admin.admin.email}
											</>
										) : (
											<>no admin</>
										)}
									</Text>
								</Stack>
							</Menu>
							<Spacer />
						</SidebarSection>

						<SidebarSection direction="row">
							<Box w={'100%'}>
								<Form
									method="post"
									action="/auth/logout2">
									<Button
										w={'100%'}
										size={'md'}
										type={'submit'}>
										Logout
									</Button>
								</Form>
							</Box>
						</SidebarSection>

						<SidebarSection
							flex="1"
							overflowY="auto">
							<NavGroup>
								<NavLink
									label="Dashboard"
									icon={<FiHome size="1.2em" />}
									href={'/admin/dashboard'}
								/>
								<NavLink
									label="Branches"
									icon={<BsFillTreeFill size="1.2em" />}
									href={'/admin/branches'}
								/>
								<NavLink
									label="Questions"
									icon={<AiFillQuestionCircle size="1.2em" />}
									href={'/admin/questions'}
								/>
								<NavLink
									label="Import"
									icon={<AiFillRest size="1.2em" />}
									href={'/admin/import'}
								/>
							</NavGroup>
						</SidebarSection>

						<SidebarSection flex="1">
							<NavGroup>
								<NavLink
									label="Users"
									icon={<FiUsers size="1.2em" />}
									href={'/admin/users'}
								/>
							</NavGroup>
						</SidebarSection>
					</Sidebar>
				}>
				<Stack
					direction="row"
					h="100%"
					spacing={'0'}>
					<Outlet />
				</Stack>
			</AppShell>

			{/*<AppShell*/}
			{/*  variant="static"*/}
			{/*  height="100%"*/}
			{/*  sidebar={*/}

			{/*    <Sidebar height="100%"*/}
			{/*             width={"400px"}*/}
			{/*             bgColor={"#fff"} //e8e8e8*/}
			{/*             motionPreset="none"*/}
			{/*             border={"none"}*/}
			{/*             variant="condensed"*/}

			{/*    >*/}

			{/*      <SidebarSection direction="row">*/}
			{/*        <Box width={"100%"}>*/}
			{/*          <Form method="post" action="/logout">*/}
			{/*            <Button type={"submit"}*/}
			{/*                    size={"md"}*/}
			{/*                    width={"100%"}>*/}
			{/*              Logout*/}
			{/*            </Button>*/}
			{/*          </Form>*/}
			{/*        </Box>*/}
			{/*      </SidebarSection>*/}

			{/*      <SidebarSection flex="1" overflowY="auto">*/}
			{/*        <NavLink label="Home" icon={<FiHome size="1.4em" />} size="lg" href={"/admin"} isActive />*/}
			{/*        <NavLink label="Questions" icon={<AiFillQuestionCircle size="1.4em" />} size="lg"*/}
			{/*                 href={"/admin/questions"} />*/}
			{/*        <NavLink label="Users" icon={<FiUsers size="1.4em" />} size="lg" href={"/admin/users"} />*/}
			{/*        <NavLink label="Plans" icon={<FiAirplay size="1.4em" />} size="lg" href={"/admin/plans"} />*/}
			{/*      </SidebarSection>*/}

			{/*      <SidebarSection flex="1" overflowY="auto">*/}
			{/*        <NavGroup>*/}
			{/*          <NavLink label="Settings" icon={<FiSettings size="1.4em" />} size="lg" href={"/admin/settings"} />*/}
			{/*        </NavGroup>*/}
			{/*      </SidebarSection>*/}

			{/*    </Sidebar>*/}

			{/*  }*/}
			{/*>*/}
			{/*  <HStack spacing={"0"}*/}
			{/*          height={"100%"}*/}
			{/*          width={"100%"}>*/}

			{/*    <Box height="100%"*/}
			{/*         width={"65%"}*/}
			{/*         bgColor={"#fff"} //e8e8e8*/}
			{/*         overflowY={"auto"}*/}
			{/*         borderRight={"2px"}*/}
			{/*         borderColor={"#e2e4ee"}*/}
			{/*    >*/}

			{/*      <Outlet />*/}

			{/*    </Box>*/}

			{/*  </HStack>*/}

			{/*</AppShell>*/}
		</>
	);
}
