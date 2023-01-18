import React from 'react';

import type {DataFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Outlet} from "@remix-run/react";

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
			user layout
			<Outlet/>
		</>
	);
}
