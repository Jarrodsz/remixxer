import {
	authenticator,
	HOST_URL
} from 'app/core/services/auth/role/admin/config.server';
import {DiscordStrategy, SocialsProvider} from 'remix-auth-socials';

import {createSocialUser} from 'app/domains/core/user/create-user';
import {getUserById} from 'app/domains/core/user/get-user';

authenticator.use(
	new DiscordStrategy(
		{
			clientID: process.env.DISCORD_CLIENT_ID || '',
			clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
			callbackURL: `${HOST_URL}/auth/${SocialsProvider.DISCORD}/callback`,
			scope: ['identify', 'email']
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
						email: profile.__json.email ? profile.__json.email : '',
						avatar: profile.__json.avatar
							? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.__json.avatar}.png`
							: ''
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
