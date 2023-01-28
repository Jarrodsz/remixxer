import {
	authenticator,
	HOST_URL
} from 'app/core/services/auth/role/admin/config.server';
import {GoogleStrategy, SocialsProvider} from 'remix-auth-socials';

import {createSocialUser} from 'app/domains/core/user/create-user';
import {getUserById} from 'app/domains/core/user/get-user';

authenticator.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			callbackURL: `${HOST_URL}/auth/${SocialsProvider.GOOGLE}/callback`,
			prompt: 'consent'
		},
		async ({profile}) => {
			// Checks for user existence in database.
			const user = await getUserById({
				id: profile.id,
				include: {
					subscription: true
				}
			});

			if (!user) {
				// Creates and stores a new user in database.
				const newUser = await createSocialUser({
					user: {
						id: profile.id,
						name: profile.displayName,
						email: profile._json.email,
						avatar: profile._json.picture
					},
					include: {
						subscription: true
					}
				});
				if (!newUser) throw new Error('Failed to create a new user.');

				// Returns newly created user as Session.
				return newUser;
			}

			// Returns user from database as Session.
			return user;
		}
	)
);
