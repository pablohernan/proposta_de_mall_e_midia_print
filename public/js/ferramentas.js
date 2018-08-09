/* Pablo Rapetti */


function ferramentasInit(){
	ferramentasShowTitle();
}

function ferramentasShowTitle(){

	$('input').each(function( index ) {
		
		$(this).attr('title',$(this).attr('id'));

	});

	$('select').each(function( index ) {
		
		$(this).attr('title',$(this).attr('id'));

	});


	$('textarea').each(function( index ) {
		
		$(this).attr('title',$(this).attr('id'));

	});


}


ferramentasInit();


