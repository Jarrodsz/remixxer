import React from 'react';
import {authenticator} from 'app/core/services/auth/role/admin/config.server';
import {useLoaderData} from "@remix-run/react";
import {json, LoaderArgs, MetaFunction} from "@remix-run/node";

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
	// I also would like to return the admin here as an object
    return json({
        user: admin,
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
            ADMIN ROUTE
        </>
    );
}
