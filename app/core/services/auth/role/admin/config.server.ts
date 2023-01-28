import {Authenticator} from 'remix-auth';

import type {AdminSession} from '~/core/services/auth/role/admin/session.server';
import {sessionStorage} from '~/core/services/auth/role/admin/session.server';

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<AdminSession>(sessionStorage);

export const HOST_URL =
	process.env.NODE_ENV === 'development'
		? process.env.DEV_HOST_URL
		: process.env.PROD_HOST_URL;
