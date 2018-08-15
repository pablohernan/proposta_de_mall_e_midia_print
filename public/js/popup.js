var serverPath = 'https://wiseitcsc.partage.com.br:8445';
var codEmpreendimento = '1';



var localVersion = false;

var phase_1 = 2617647; 
var phase_2 = 2617648;
var phase_3 = 2617649;
var phase_4 = 2617650;

var path = '';
if(localVersion){
 path = 'http://localhost/pipefy/forms/proposta_de_locacao/public';
 showList();
}

var cardId;

document.addEventListener("DOMContentLoaded", function(event) {
     
        //debug();

     // try{
        p = PipefyApp.init();
        //PipefyApp.resizeTo("#list");
        
        //PipefyApp.render(function(){
        //});

        

        p.card().then(function(card) {
          //console.log('CARD_ID:'+card.id) // { id: '23abc', ... }
          //cardId = card.id;
          
          init(card,p);
          //console.log(card.current_phase.id);
        });
     // }catch(e){console.log(e)}

});




function init(card,p){

  var data = new Date().toJSON().slice(0,10);
  var dataFormat = data.split('-')[2] + '.' + data.split('-')[1] + '.' + data.split('-')[0];
  $('#data_emissao').html(dataFormat);
  db_get_fields(card.internalId, function(ret){

    var data = ret.data;
    var arrFields = data.card.fields;
    var id = ret.data.card.id;

    $( ".save" ).each(function( index ) {
      $( this ).val( db_get_field( $( this ).attr('id') ,data) );
    });

    $( ".date" ).each(function( index ) {
      $( this ).val( db_get_date( $( this ).attr('id') ,data) );
    });


    $("[id='id']").val(id);

    //Endereço
    var EnderecoFormat = db_get_field('Logradouro',data) + ', ' + db_get_field('Número',data) + ', ' + db_get_field('Complemento',data);
    $("[id='Endereço']").val(EnderecoFormat);     

  })

}

function printContainer(){

  $('#container').removeClass( 'container_scroll' );
  $('#btnSalvar').hide();

  window.print();

  $('#container').addClass( 'container_scroll' );
  $('#btnSalvar').show();

}


function debug(){

  $('input').each(function(){
      $(this).val('[--'+$(this).attr('id')+'--]');
  })

  $('textarea').each(function(){
      $(this).val('[--'+$(this).attr('id')+'--]');
  })

  $('select').each(function(){
      $(this).replaceWith('<input type="text" tabindex="0" class="pp-input save" value="[--'+$(this).attr('id')+'--]" id="'+$(this).attr('id')+'" name="'+$(this).attr('id')+'">');
  })

  $('.pp-custom-select').removeClass('pp-custom-select');

}



