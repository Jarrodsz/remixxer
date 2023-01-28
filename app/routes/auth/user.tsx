import React from 'react';
import {authenticator} from 'app/core/services/auth/role/user/config.server';
import {useLoaderData} from "@remix-run/react";
import {json, LoaderArgs, MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
	return {
		title: 'USER'
	};
};

/**
 * LOADER
 */
export async function loader({request}: LoaderArgs) {
	const user = await authenticator.isAuthenticated(request);
	// I also would like to return the user here as an object
	return json({
		user: user,
	});
}

/**
 * VIEW
 * @constructor
 */
export default function PageRoute() {
	const data = useLoaderData<typeof loader>();


	return (
		<>
			USER ROUTE
		</>
	);
}
