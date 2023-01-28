import {Authenticator} from 'remix-auth';

import type {UserAuthSession} from 'app/core/services/auth/role/user/session.server';
import {sessionStorage} from 'app/core/services/auth/role/user/session.server';

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<UserAuthSession>(sessionStorage);

export const HOST_URL =
	process.env.NODE_ENV === 'development'
		? process.env.DEV_HOST_URL
		: process.env.PROD_HOST_URL;
