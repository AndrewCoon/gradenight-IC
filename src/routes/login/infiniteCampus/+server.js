import { login } from 'studentvue.js'
import cookie from 'cookie'

import {ic_login} from './ic.js/'

export async function POST({ request }) {
	console.log('post login')

	const body = await request.json()
	let result

	try {
		let client = ic_login(body.districtName, body.finalState, body.username, body.password).then((cl) => {
			console.log('woaw')
			cl.getMessages().then((value) => console.log(JSON.parse(value)))
		})
		console.log("hii :3");
		/*result = await Promise.all([
			
		])*/


		return new Response(null, {
			status: 200
		})
	} catch (error) {
		console.log(error)
		return new Response(null, {
			status: 401
		})
	}

	/*const currentPeriod =
		result[1].ReportingPeriods.ReportPeriod.length -
		1 -
		result[1].ReportingPeriods.ReportPeriod.slice()
			.reverse()
			.findIndex((period) => {
				return new Date() > new Date(period.StartDate)
			})

	return new Response(
		JSON.stringify({
			student: result.shift(),
			periods: result,
			currentPeriod
		}),
		{
			headers: {
				'Set-Cookie': cookie.serialize(
					'auth',
					Buffer.from(body.username).toString('base64') +
						':' +
						Buffer.from(body.password).toString('base64') +
						':' +
						Buffer.from(body.districtUrl).toString('base64'),
					{
						httpOnly: true,
						maxAge: 60 * 60 * 24 * 30,
						sameSite: 'strict',
						path: '/'
					}
				)
			}
		}
	)*/
}


