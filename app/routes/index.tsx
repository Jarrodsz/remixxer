import React from 'react';

import type {DataFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Link} from "@remix-run/react";
import {Box} from "@chakra-ui/react";

/**
 * LOADER
 */
export async function loader({request}: DataFunctionArgs) {
    return json({
        empty: true
    });
}

/**
 * VIEW
 */
export default function Index() {
    return (
        <>
            index.tsx placeholder
            <Box>
				<Link to={"/user"}>/user</Link>
            </Box>

			<Box>
				<Link to={"/user/onboard"}>/user/onboard</Link>
			</Box>
        </>
    );
}
