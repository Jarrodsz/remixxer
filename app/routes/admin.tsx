import {Outlet} from "@remix-run/react";
import {Box, Stack, Heading} from "@chakra-ui/react";
import {NavLink, Link} from "@remix-run/react"

import {
    Sidebar,
    SidebarSection,
    SidebarToggleButton,
    SidebarOverlay,
    NavGroup,
    NavItem,
} from '@saas-ui/sidebar'
import {FiUsers} from "react-icons/fi";


export default function Index() {
    return (
        <>
            <Box>
                This will work as a layout, outlet is rendered inside this
            </Box>


            <Stack spacing="10" direction="row" height={"100%"} width={"full"}>

                <Sidebar
                    width={"230px"}
                    height="100%"
                    bgColor={"#f1f1f1"}
                    borderRight={"1px"}
                    borderColor={"red"}
                    pt={"5"}
                >
                    <SidebarSection
                        flex="1"
                        overflowY="auto"
                        pt={"5"}
                    >

                        <Heading size={"md"} mb={"5"} ml={"3"}>
                            Settings
                        </Heading>

                        <NavGroup>

                            <Box><NavLink to={"/admin/support"}>This is a navlink fetching without reload</NavLink></Box>
                            <Box><Link to={"/admin/support"}>General</Link></Box>
                            <Box><Link to={"/admin/support"}>Something Else</Link></Box>

                            <NavItem label="General" icon={<FiUsers />} href={"/admin/support"} />
                            <NavItem label="Emails"
                                     icon={<FiUsers />}
                                     href={"/admin/support"}
                                     noOfLines={1} />
                        </NavGroup>

                    </SidebarSection>

                </Sidebar>

                <Box width={"full"} height={"100%"}>
                    <Outlet />
                </Box>

            </Stack>

        </>
    );
}
