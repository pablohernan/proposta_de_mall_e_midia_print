
function htmhlentites_encode(string){
	return jQuery('<div />').text(string).html()
}

function htmhlentites_decode(string){
	return jQuery('<div />').html(string).text()
}


