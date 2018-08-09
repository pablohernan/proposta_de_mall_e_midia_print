
function vl_data(data){ // 12/12/2012

	moment.locale('pt-BR');
	// data invalida
	if(!moment( data , 'DD/MM/YYYY',true).isValid()){
		return 'Data Invalida';
		return false;
	}

	// anterior
	if(moment( data, 'DD/MM/YYYY').fromNow().indexOf('ago')>-1 && !(moment($('#VENCIMENTO_NOVO').val(), 'DD/MM/YYYY').fromNow().indexOf('hours ago')>-1)){
		return 'Não pode ser anterior ao dia de hoje';
	}

	return true;

}
