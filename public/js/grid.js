


function grid_addLine(grupo,centro,valor_custo){

  var lineNumber = $( "#accordion" ).find(".card").length + 1;

	var line = '<div class="card">'+
    '<div class="card-header" id="heading'+lineNumber+'">'+
      '<h5 class="mb-0">'+
        '<button onclick="setTimeout(function(){ resize(); }, 500);" class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse'+lineNumber+'" aria-expanded="false" aria-controls="collapse'+lineNumber+'">'+
         ' Item #'+lineNumber+' '+
        '</button>'+
      '</h5>'+
    '</div>'+
    '<div id="collapse'+lineNumber+'" class="collapse" aria-labelledby="heading'+lineNumber+'" data-parent="#accordion">'+
      '<div class="card-body">'+
        '<p><b>Grupo de Pagamento: </b><span class="item1">'+grupo+'</span></p>'+
        '<p><b>Centro de Custo: </b><span class="item2">'+centro+'</span></p>'+
        '<p><b>Valor: </b><span class="item3">'+valor_custo+'</span></p>'+
      '</div>'+
    '</div>'+
  '</div>';

  $( "#accordion" ).append( line );

  resize();

}