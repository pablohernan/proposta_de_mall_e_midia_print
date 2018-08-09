/* Pablo Rapetti */


function tabsInit(){
	tabsRender();
}

function tabsRender(){

	$('.tabs').each(function( index ) {
		
		$(this).find('a').each(function( index ){
			$(this).attr('tabindex',index);
			$(this).click(function(event) {
			  changeTab( event.target );
			})
		  if( index == 0 )
		  	$(this).addClass('pp-active');
		});

		$(this).find('.tab').each(function( index ){
			$(this).attr('tabindex',index);
		  if( index == 0 )
		  	$(this).show();
		});

	});

}

function changeTab(obj){

	var tabindex = $(obj).attr('tabindex');
	var pai =  $(obj).parent().parent().parent();
	
	$(pai).find('a').each(function( index ){
	  if( tabindex == index )
	  	$(this).addClass('pp-active');
	  else
	  	$(this).removeClass('pp-active');
	});

	$(pai).find('.tab').each(function( index ){
	  if( tabindex == index )
	  	$(this).show();
	  else
	  	$(this).hide();
	});

}

tabsInit();


