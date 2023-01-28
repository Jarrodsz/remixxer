import type {Admin, AdminPassword, AdminProfile} from '@prisma/client';

import {createCookieSessionStorage} from '@remix-run/node';

export interface AdminSession extends Admin {
	password?: AdminPassword | null;
	AdminProfile?: AdminProfile | null;
}

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [process.env.SESSION_ADMIN_SECRET || 'SESSION_ADMIN_SECRET'],
		secure: process.env.NODE_ENV === 'production'
	}
});

export const {getSession, commitSession, destroySession} = sessionStorage;
