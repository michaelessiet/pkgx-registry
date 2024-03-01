import { pkgxClient } from "~/utils/constants"

export default defineEventHandler(async (event) => {
	const pkglist = await pkgxClient.get('/index.json')
	return pkglist.data
})