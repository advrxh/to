

document.onload = () => {
	let slug = window.location.pathname.split("/").slice(-1)[0]



	if (slug == "linkedin"){
		window.location.href = "https://linkedin.com";
	}
		
		

	if (slug == "google-og"){
		window.location.href = "https://google.com";
	}
		
		
}
