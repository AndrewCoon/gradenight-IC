import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals }) {
	console.log('login server load')
	console.log('redirect to home')
	throw redirect(302, '/sis')
}
