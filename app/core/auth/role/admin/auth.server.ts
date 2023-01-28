import {Authenticator} from 'remix-auth';

import type {AdminAuthSession} from 'app/core/services/auth/role/admin/session.server';
import {sessionStorage} from 'app/core/services/auth/role/admin/session.server';

/**
 * Inits Authenticator.
 */
export let authenticator = new Authenticator<AdminAuthSession>(sessionStorage);

export const HOST_URL =
	process.env.NODE_ENV === 'development'
		? process.env.DEV_HOST_URL
		: process.env.PROD_HOST_URL;
