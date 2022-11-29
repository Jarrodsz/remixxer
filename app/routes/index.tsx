import {Link} from "@remix-run/react";
import {Box} from "@chakra-ui/react";

export default function Index() {
    return (
        <>
            Remix Playground

            <Box>
                <Link to={"/admin"}>Link to admin</Link>
            </Box>
        </>
    );
}
