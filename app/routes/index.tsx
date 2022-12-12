import {Link, NavLink} from "@remix-run/react";
import {Box} from "@chakra-ui/react";
import {NavItem} from "@saas-ui/sidebar";

export default function Index() {
    return (
        <>
            Remix Playground

            <Box>
                <Link to={"/admin"}>Link to admin</Link>

                <NavLink to={"user/support"}>NavLink</NavLink>
                <Link to={"user/support"}>Link</Link>
                <NavItem label="xxx" size="lg" href={"user/support"} />

            </Box>
        </>
    );
}
