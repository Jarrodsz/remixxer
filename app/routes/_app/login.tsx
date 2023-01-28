import React from 'react';
import {performMutation} from 'remix-forms';

import type {ActionArgs, LoaderArgs} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';

import {Link, useSubmit} from '@remix-run/react';

import {authenticator} from '~/core/services/auth/role/user/auth.server';
import {
	commitSession,
	getSession
} from '~/core/services/auth/role/user/session.server';

import {Box, Checkbox, Container, HStack, Stack, Text} from '@chakra-ui/react';

import {zodResolver} from '@saas-ui/forms/zod';
import {Field, Form, FormLayout, SubmitButton} from '@saas-ui/react';

import {loginFormSchema} from 'app/domains/core/auth/_schema';
import {loginUser} from 'app/domains/core/auth/login';

export async function action({request}: ActionArgs) {
	console.log('ACTION');

	const result = await performMutation({
		request,
		schema: loginFormSchema,
		mutation: loginUser
	});

	if (!result.success) {
		console.log('mutation loginUser failed');
		console.log(result.errors);
		return json({errors: result.errors, values: result.values});
	} else {
		console.log('mutation loginUser sucessfull');
		const session = await getSession(request.headers.get('cookie'));
		console.log('THIS sHOULD BE USER');
		console.log(result.data);
		session.set(authenticator.sessionKey, result.data.user);

		const user = result.data.user;
		const redirectPath = user?.hasOnboarded ? '/user' : '/user/onboard';
		return redirect(redirectPath, {
			headers: {'Set-Cookie': await commitSession(session, {})}
		});
	}
}

/**
 * LOADER
 * @param request
 */
// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({request}: LoaderArgs) {
	console.log('LOADER');
	// If the user is already authenticated redirect to / directly

	return await authenticator.isAuthenticated(request, {
		successRedirect: '/user'
	});
}

/**
 * VIEW
 */
export default function PageRoute() {
	console.log('VIEW');
	let submit = useSubmit();

	function handleSubmit(data, event) {
		submit(event.target, {method: 'post'});
	}

	return (
		<>
			<Container>
				<Box
					px={'4'}
					py={'4'}
					bg={'white'}
					border={'2px'}
					borderColor={'gray.200'}
					borderRadius={'md'}>
					<Stack spacing="4">
						{/*<Heading textAlign="center" size="md">*/}
						{/*  Login*/}
						{/*</Heading>*/}

						<Stack spacing="10">
							<FormLayout>
								<Form
									method="post"
									resolver={zodResolver(loginFormSchema)}
									defaultValues={{
										email: 'user1@checkr.nl',
										password: 'talkmate'
									}}
									onSubmit={handleSubmit}>
									<Field
										size="lg"
										name="email"
										placeholder={'me@me.com'}
										borderBottomRadius="none"
									/>
									<Field
										size="lg"
										type="password"
										name="password"
										borderTopRadius="none"
									/>

									<SubmitButton
										colorScheme="blue"
										mt={'3'}
										width="100%"
										label={'Login'}
										size="lg"
									/>
								</Form>
							</FormLayout>
						</Stack>

						<HStack justify="space-between">
							<Checkbox
								defaultChecked
								id={'remember'}
								size="sm">
								Remember me
							</Checkbox>
							<Link to={'/password'}>Forgot password?</Link>
						</HStack>
					</Stack>
				</Box>
				<HStack
					justify="center"
					mt={'2'}>
					<Text color="muted">Don't have an account?</Text>
					<Link
						to={{
							pathname: '/signup'
						}}>
						Sign up
					</Link>
				</HStack>
			</Container>
		</>
	);
}
