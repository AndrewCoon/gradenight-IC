import { login } from 'studentvue.js'
import * as cookie from 'cookie'


export async function GET({ locals }) {
	console.log('get data')

	let result

	try {
		let api = Buffer.from(locals.user.api, 'base64').toString('ascii');
		let user = Buffer.from(locals.user.username, 'base64').toString('ascii');
		let pass = Buffer.from(locals.user.password, 'base64').toString('ascii');

		let param1, state;

		if(api == "vue")
			param1 = Buffer.from(locals.user.districtUrl, 'base64').toString('ascii');
		else{
			param1 = Buffer.from(locals.user.districtName, 'base64').toString('ascii');
			state = Buffer.from(locals.user.state, 'base64').toString('ascii');
		}
		

		if(api == "vue"){
			let client = await login(
				param1,
				user,
				pass
			)
		}else{
			let client = await ic_login(
				param1,
				state, 
				user,
				pass
			)
		}
		// let student = JSON.parse(await client.getStudentInfo()).StudentInfo
		// let gradebook = JSON.parse(await client.getGradebook()).Gradebook
		if(api == "vue"){

			result = await Promise.all([
				client.getStudentInfo().then((value) => JSON.parse(value).StudentInfo),
				client.getGradebook(0).then((value) => JSON.parse(value).Gradebook),
				client.getGradebook(1).then((value) => JSON.parse(value).Gradebook),
				client.getGradebook(2).then((value) => JSON.parse(value).Gradebook),
				client.getGradebook(3).then((value) => JSON.parse(value).Gradebook)
			])
		}else{
			result = await Promise.all([
				client.getMessages().then((value) => console.log(JSON.parse(value)))
			])
		}

		if (!result[0]) {
			throw new Error('No data returned')
		}
	} catch (error) {
		console.log(error)
		return new Response(null, {
			status: 401,
			headers: {
				'Set-cookie': cookie.serialize('auth', '', {
					httpOnly: true,
					sameSite: 'strict',
					path: '/',
					expires: new Date(0)
				})
			}
		})
	}

	console.log('logged in')

	const currentPeriod =
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
			currentPeriod,
			periodDates: result[1].ReportingPeriods.ReportPeriod
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
}
