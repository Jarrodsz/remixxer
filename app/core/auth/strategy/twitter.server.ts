import {
	authenticator,
	HOST_URL
} from 'app/core/services/auth/role/admin/config.server';
import {TwitterStrategy} from 'remix-auth-twitter';

import {createSocialUser} from 'app/domains/core/user/create-user';
import {getUserById} from 'app/domains/core/user/get-user';

authenticator.use(
	new TwitterStrategy(
		{
			clientID: process.env.TWITTER_CLIENT_ID || '',
			clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
			callbackURL: `${HOST_URL}/auth/twitter/callback`,
			includeEmail: true
		},
		async ({accessToken, accessTokenSecret, profile}) => {
			// Checks for user existence in database.
			const user = await getUserById({
				id: profile.id_str,
				include: {
					subscription: true
				}
			});

			if (!user) {
				// Creates and stores a new user in database.
				const newUser = await createSocialUser({
					user: {
						id: profile.id_str,
						name: profile.name,
						email: profile.email ? profile.email : '',
						avatar: profile.profile_image_url
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
