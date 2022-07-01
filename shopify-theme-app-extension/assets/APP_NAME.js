console.log("APP_NAME's initing");

const LOAD_SCRIPT = () => {
	console.log("APP_NAME loaded");
	const $scriptEl = document.createElement("script");
	$scriptEl.type = "text/javascript";
	$scriptEl.src = "APP_NAME.netlify.js";
	$scriptEl.addEventListener("load", () => {
		console.log("APP_NAME - JS loaded");
	});
	$scriptEl.addEventListener("error", (e) => {
		console.log("APP_NAME - JS load failed", e);
	});
	document.body.appendChild($scriptEl);
};

LOAD_SCRIPT();

// gán tên theme lên body để hỗ trợ việc custom css
const interval = setInterval(() => {
	try {
		const bodyThemeName = `APP_NAME-${window.Shopify.theme.name.toLowerCase().replaceAll(" ", "-")}`;
		document.body.classList.add(bodyThemeName);
		if (document.body.className.includes(bodyThemeName)) {
			clearInterval(interval);
		}
	} catch {}
}, 500);
