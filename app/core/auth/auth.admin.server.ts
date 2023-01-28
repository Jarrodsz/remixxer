import {authenticator} from 'app/core/services/auth/role/admin/auth.server';

export async function authenticateAdmin(request: Request) {
	const adminAuth = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login2'
	});

	let admin = await authenticator.isAuthenticated(request);
	return admin;
}
