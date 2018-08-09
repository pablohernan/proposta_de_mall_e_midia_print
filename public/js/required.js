/* 
@author: Pablo Rapetti 
Fields requiereds */

$('.required').each(function(index){
	$(this).find('.pp-label-text').append('&nbsp;<span>(*)</span>');
});

function rc_showMesages(){
	
	var ret = false;
	$('.required').each(function(index){		
		
		/* inputs */
		if($(this).find('.pp-input').length > 0 && $.trim($(this).find('.pp-input').val()) == '' && $(this).find('.pp-input').hasClass('save')){
			$(this).find('.pp-input').focus();
			$(this).addClass('pp-error');

			if($(this).find('.pp-help-message').length==0)
				$(this).append('<span class="pp-help-message">Campo obrigatório</span>');
			
			$(this).find('.pp-input').keypress(function(event) {
		    event = event || window.event;
		    var target = event.target || evtobj.srcElement; 
	    	$('#'+target.id).parent().removeClass('pp-error');
	    	$('#'+target.id).parent().find('.pp-help-message').remove();
			});
			ret = true;
		}

		/* selects */
		if($(this).find('.pp-select').length > 0 && $.trim($(this).find('.pp-select').val()) == '' && $(this).find('.pp-select').hasClass('save')){
			$(this).find('.pp-select').focus();
			$(this).addClass('pp-error');
			
			if($(this).find('.pp-help-message').length==0)
				$(this).append('<span class="pp-help-message">Campo obrigatório</span>');

			$(this).find('.pp-select').change(function(event) {
		    event = event || window.event;
		    var target = event.target || evtobj.srcElement; 
	    	$('#'+target.id).parent().parent().removeClass('pp-error');
	    	$('#'+target.id).parent().parent().find('.pp-help-message').remove();
			});			
			ret = true;
		}	

	});

	return ret;

}


function rc_showMesagesGrid(id){
	
	var ret = false;
	$('#'+id).find('.required').each(function(index){		
		
		/* inputs */
		if( $(this).find('.pp-input').length > 0 && $.trim($(this).find('.pp-input').val()) == '' ){
			$(this).find('.pp-input').focus();
			$(this).addClass('pp-error');

			if($(this).find('.pp-help-message').length==0)
				$(this).append('<span class="pp-help-message">Campo obrigatório</span>');
			
			$(this).find('.pp-input').keypress(function(event) {
		    event = event || window.event;
		    var target = event.target || evtobj.srcElement; 
	    	$('#'+target.id).parent().removeClass('pp-error');
	    	$('#'+target.id).parent().find('.pp-help-message').remove();
			});
			ret = true;
		}

		/* selects */
		if( $(this).find('.pp-select').length > 0 && $.trim($(this).find('.pp-select').val()) == '' ){
			$(this).find('.pp-select').focus();
			$(this).addClass('pp-error');

			if($(this).find('.pp-help-message').length==0)
				$(this).append('<span class="pp-help-message">Campo obrigatório</span>');

			$(this).find('.pp-select').change(function(event) {
		    event = event || window.event;
		    var target = event.target || evtobj.srcElement; 
	    	$('#'+target.id).parent().parent().removeClass('pp-error');
	    	$('#'+target.id).parent().parent().find('.pp-help-message').remove();
			});			
			ret = true;
		}	

	});

	return ret;

}


function rc_hideMesages(){
	$('.required').removeClass('pp-error');
	$('.pp-help-message').remove();
}



// data hoje o futura
function rc_showMesagesData(){
	
	var ret = false;
	$('.data').each(function(index){		
		
		/* inputs */
		if(vl_data($(this).find('.pp-input').val())!=true){
			$(this).find('.pp-input').focus();
			$(this).addClass('pp-error');

			if($(this).find('.pp-help-message').length==0)
				$(this).append('<span class="pp-help-message">'+vl_data($(this).find('.pp-input').val())+'</span>');
			
			$(this).find('.pp-input').keypress(function(event) {
		    event = event || window.event;
		    var target = event.target || evtobj.srcElement; 
	    	$('#'+target.id).parent().removeClass('pp-error');
	    	$('#'+target.id).parent().find('.pp-help-message').remove();
			});
			ret = true;
		}

	});

	return ret;

}




//setTimeout(function(){ rc_hideMesages(); }, 3000);

//rc_showMesages();