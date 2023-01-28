// used to login abstract from controllers
import {authenticator} from '~/core/services/auth/role/user/auth.server';

export async function authenticateUser(request: Request) {
	const userAuth = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login'
	});

	let user = await authenticator.isAuthenticated(request);
	return user;
}
