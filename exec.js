const fs = require('node:fs');
const path = require('path');


const flushRedirects = () => {

	fs.readdir("./", (err, files) => {
	  if (err) {
	    return
	  }
	  files.forEach((file) => {
	    const filePath = path.join("./", file);

	    if (path.extname(file) === '.html') {
	      fs.unlink(filePath, (err) => {
		if (err) {
			return
		} 
	      });
	    }
	  });
	});

}

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

		let scriptContent = `
		<html>
		<script>
		document.onload = () => {
		`;
		const redirectSyntax = `
		window.location.href = "${redirects[i].url}";
		`
		scriptContent += redirectSyntax;
		scriptContent += `
		}
		</script>
		</html>
		`
		fs.writeFile(`./${redirects[i].slug}.html`, scriptContent, (err) => {
			if (err){
				console.log(err);
				return
			}
		})
	}
}

fs.readFile('./redirects.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	const redirects = parseRedirects(data);
	
	flushRedirects();
	setupRedirects(redirects);
});

