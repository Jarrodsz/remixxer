import React from 'react';

import type {DataFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';

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
export default function PageRoute() {
	return <>_app/index</>;
}
