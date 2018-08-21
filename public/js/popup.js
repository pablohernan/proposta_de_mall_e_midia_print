
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

  $('#data_emissao').html(moment().format('DD.MM.YYYY, h:mm:ss a'));


  db_get_parent(card.internalId, function(parent){

      var cardId = card.internalId;
      // se tem pai , pego o id do pai para imprimr
      if(parent.data.card.parent_relations.length > 0 )
        cardId = parent.data.card.parent_relations[0].cards[0].id;

      db_get_fields(cardId, function(ret){

        var data = ret.data;
        var arrFields = data.card.fields;
        var id = ret.data.card.id;

        $( ".save" ).each(function( index ) {
          $( this ).val( db_get_field( $( this ).attr('id') ,data) );
        });

        $( ".date" ).each(function( index ) {
          if($( this ).attr('phase'))
            $( this ).val( db_get_date( $( this ).attr('id') ,data,$( this ).attr('phase')) );
          else
            $( this ).val( db_get_date( $( this ).attr('id') ,data) );
        });


        $("[id='id']").val(id);

        //compuesto_Logradouro_Número_Complemento
        var endFormat = db_get_field('Logradouro',data) + ', ' + db_get_field('Número',data) + ', ' + db_get_field('Complemento',data);
        $("[id='compuesto_Logradouro_Número_Complemento']").val(endFormat);  

        //compuesto_Início da Operação_Observações
        var inicioFormat = db_get_field('Início da Operação',data) + '\n' + db_get_field('Observações',data);
        $("[id='compuesto_Início da Operação_Observações']").val(inicioFormat); 

        //compuesto_Valor do Aluguel_Observações sobre o valor do aluguel    
        var aluguelFormat = db_get_field('Valor do Aluguel',data) + '\n' + db_get_field('Observações sobre o valor do aluguel',data);
        $("[id='compuesto_Valor do Aluguel_Observações sobre o valor do aluguel']").val(aluguelFormat);         

        //compuesto_Valor da Energia_Observações sobre o valor da energia
        var energiaFormat = db_get_field('Valor da Energia',data) + '\n' + db_get_field('Observações sobre o valor da energia',data);
        $("[id='compuesto_Valor da Energia_Observações sobre o valor da energia']").val(energiaFormat);         

        // resize textareas to content
        $( "textarea" ).each(function( index ) {
          $( this ).height( $(this)[0].scrollHeight );
        });   

        showList();     


      });



  });

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

function showList(){
  $('#load').hide();
  $('#list').show();
}




