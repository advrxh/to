const fs = require('node:fs');

let scriptContent = `

document.onload = () => {
	let slug = window.location.pathname.split("/").slice(-1)[0]

`;

const parseRedirects = (txt) => {

	let redirects = []

	const redirect_lines = txt.split("\n");

	for (i = 0; i < (redirect_lines.length - 1); i++){
		let slug = redirect_lines[i].split(" ")[0]
		let url = redirect_lines[i].split(" ")[1]
		redirects.push({slug, url})
	}

	return redirects
}

const setupRedirects = (redirects) => {

	for (i = 0; i < redirects.length; i++){

		const redirectSyntax = `

	if (slug == "${redirects[i].slug}"){
		window.location.href = "${redirects[i].url}";
	}
		
		`

		scriptContent += redirectSyntax;

	}

	scriptContent += `
}
`;

	fs.writeFile("./ghitto/index.js", scriptContent, (err) => {
		if (err){
			console.log(err);
			return
		}
	})
}

fs.readFile('./redirects.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	const redirects = parseRedirects(data);
	
	setupRedirects(redirects);
});

