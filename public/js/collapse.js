/* Pablo Rapetti */

function collapseInit(){
	collapseRender();
}

function collapseRender(){

	$('.pp-collapse').click(function(){

		if($( this ).hasClass('pp-collapse-closed')){
			$( this ).removeClass('pp-collapse-closed');
			$( this ).addClass('pp-collapse-opened');			
		}else{
			$( this ).removeClass('pp-collapse-opened');		
			$( this ).addClass('pp-collapse-closed');			
		}

	});

	$('.pp-collapse-body').click(function(){
		return false;
	});	

}

collapseInit();