import type {ActionArgs} from '@remix-run/node';

import {authenticator} from '~/core/services/auth/role/admin/auth.server';

/**
 * ACTION
 */
export async function action({request}: ActionArgs) {
	return await authenticator.logout(request, {redirectTo: '/admin'});
}

/**
 * VIEW
 */
export default function PageRoute() {
	return <div>Whops! You should have been redirected.</div>;
}
