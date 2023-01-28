import type {
	User,
	UserPassword,
	UserProfile,
	UserSubscription
} from '@prisma/client';

import {createCookieSessionStorage} from '@remix-run/node';

export interface UserAuthSession extends User {
	password?: UserPassword | null;
	subscription?: UserSubscription | null;

	// Extended
	profile?: UserProfile | null;
}

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [process.env.SESSION_USER_SECRET || 'SESSION_SECRET'],
		secure: process.env.NODE_ENV === 'production'
	}
});

export const {getSession, commitSession, destroySession} = sessionStorage;
