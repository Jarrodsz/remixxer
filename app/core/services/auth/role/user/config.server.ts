import {Authenticator} from 'remix-auth';

import type {UserSession} from '~/core/services/auth/role/user/session.server';
import {sessionStorage} from '~/core/services/auth/role/user/session.server';

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<UserSession>(sessionStorage);

export const HOST_URL =
	process.env.NODE_ENV === 'development'
		? process.env.DEV_HOST_URL
		: process.env.PROD_HOST_URL;
