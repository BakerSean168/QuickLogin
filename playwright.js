const playwright = require ( 'playwright' )

//login


async function login(account) {
	const browser = await playwright.chromium.launch({
		headless: false,
		executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' // replace with your Edge path
	  });
	const context = await browser.newContext();
	const page = await context.newPage();



	await page.goto('https://etax.zhejiang.chinatax.gov.cn/zjgfdzswj/main/index.html');
	await page.getByRole('button', { name: '确定' }).click();
	await page.locator('#loginopen').click();
	await page.getByPlaceholder('统一社会信用代码/纳税人识别号').click();
	await page.getByPlaceholder('统一社会信用代码/纳税人识别号').fill(account.unifiedCode);
	await page.getByPlaceholder('居民身份证号码/手机号码/用户名').click();
	await page.getByPlaceholder('居民身份证号码/手机号码/用户名').fill(account.phoneNumber);
	await page.getByPlaceholder('个人用户密码').click();
	await page.getByPlaceholder('个人用户密码').fill(account.password);
	await page.locator('.handler').click();
	//const box = await page.locator('.handler').boundingBox();
	//{x: 608.6000366210938, y: 493.70001220703125, width: 54, height: 40}
	//drag_text 417*40
	const xmid_origin = 635;
	const ymid_origin = 513;
	await page.mouse.move(xmid_origin, ymid_origin);
	await page.mouse.down();
	const xmid_destination = 1028;
	const ymid_destination = 514;
	await page.mouse.move(xmid_destination, ymid_destination);
	await page.mouse.up();
	await page.getByRole('button', { name: '登录' }).click();
	await page.waitForTimeout(3000000);
}
module.exports = { login };
