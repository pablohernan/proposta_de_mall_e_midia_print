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
      
      try{
        //p = PipefyApp.init();
        PipefyApp.resizeTo("#list");
        
        PipefyApp.render(function() {

        });

/*
        p.card().then(function(card) {
          console.log('CARD_ID:'+card.id) // { id: '23abc', ... }
          cardId = card.id;


          //console.log(card.current_phase.id);

          if(card.current_phase.id != phase_1)//2462801)
            disableForm();

          // populo com os dados da tabela
          db_select(popular_grid);
        });
*/
      }catch(e){console.log(e)}

});

/* popular */
function popular_grid(obj){
  for(var i = 0; i<obj.length ; i++){
    if(obj[i].CARDID == cardId)
      grid_addLine(obj[i].GRUPODEPAGAMENTO ,obj[i].CENTRODECUSTO,obj[i].VALOR);
  }
  setEntradas(populaSelects);
}

var entradas = [];
function setEntradas(callBackFn){

  if($( ".save" ).length == entradas.length)
    return callBackFn();

  var objsArray = $( ".save" ).toArray();
  p.get('card', 'public', objsArray[entradas.length].id ).then((campo) => {
      entradas.push({'name' : objsArray[entradas.length].id , 'value' : campo});
      setEntradas(callBackFn);
  }).catch((error) => {
      entradas.push({'name' : objsArray[entradas.length].id , 'value' : null});
      setEntradas(callBackFn);
  });

}

function getEntrada(name){
  for(var i=0; i<entradas.length; i++){
    if(entradas[i].name == name)
      return entradas[i].value;
  }
  return false;
}



function popula_SHOPPING(popular,callbackFn){
      /* SHOPPING*/
      $.ajax({ 
          url: path+ "/services/SHOPPING.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data);  
            $('#SHOPPING').html('');// limpo
            $('#SHOPPING').append('<option value="" selected>::selecione::</option>'); 
            for( var i = 0 ; i < data.length ; i++ ){
                var selected = '';
                if(popular && getEntrada('SHOPPING') == data[i].value)    
                  selected = 'selected'; 
                $('#SHOPPING').append('<option '+selected+' phases=' + data[i].phases + ' value=' + data[i].value + '>' + data[i].text + '</option>'); 
            } 

            $('#SHOPPING').change(function(){
              popula_EMPRESA_COD(false,function(){});
              popula_NRO_DO_DOCUMENTO(false,function(){});
              popula_CENTRO_CUSTO_COD(false,function(){});
            });             

            callbackFn();        

      });
      /* SHOPPING*/   
}


function popula_EMPRESA_COD(popular,callbackFn){
      /* EMPRESA_COD*/
      $.ajax({ 
          url: path+ "/services/EMPRESA_COD.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data);  
            $('#EMPRESA_COD').html('');// limpo
            $('#EMPRESA_COD').append('<option value="" selected>::selecione::</option>'); 
            for( var i = 0 ; i < data.length ; i++ ){
              if($('#SHOPPING').val()==data[i].shopping){
                  var selected = '';
                  if(popular && getEntrada('EMPRESA_COD') == data[i].value)    
                    selected = 'selected'; 
                  $('#EMPRESA_COD').append('<option '+selected+' value=' + data[i].value + '>' + data[i].text + '</option>'); 
              } 
            }

            $('#EMPRESA_COD').change(function(){
              popula_NRO_DO_DOCUMENTO(false,function(){});
              popula_CENTRO_CUSTO_COD(false,function(){});
            });             

            callbackFn();        

      });
      /* EMPRESA_COD*/   
}


function popula_NRO_DO_DOCUMENTO(popular,callbackFn){
      /* NRO_DO_DOCUMENTO*/
      $.ajax({ 
          url: path+ "/services/NRO_DO_DOCUMENTO.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data);  
            $('#NRO_DO_DOCUMENTO').html('');// limpo
            $('#NRO_DO_DOCUMENTO').append('<option value="" selected>::selecione::</option>'); 
            for( var i = 0 ; i < data.length ; i++ ){
                if($('#EMPRESA_COD').val()==data[i].empresa && $('#FORNECEDOR_COD').val() == data[i].fornecedor){
                  var selected = '';
                  if(popular && getEntrada('NRO_DO_DOCUMENTO') == data[i].value)  
                    selected = 'selected';
                  $('#NRO_DO_DOCUMENTO').append('<option '+selected+' vencimento="'+data[i].vencimento+'" valor="'+data[i].valor+'" value="' + data[i].value + '">' + data[i].text + '</option>'); 
                }
            } 

            $('#NRO_DO_DOCUMENTO').change(function(){
              populaVencimento(this.options[this.selectedIndex].getAttribute('vencimento'));
              populaValor(this.options[this.selectedIndex].getAttribute('valor'));
              popula_CLASSIFICACAO_DESPESA_COD(false,function(){});
            });

            callbackFn();

      });
      /* NRO_DO_DOCUMENTO*/  
}


function popula_FORNECEDOR_COD(popular,callbackFn){
     /* FORNECEDOR_COD*/
      $.ajax({ 
          url: path+ "/services/FORNECEDOR_COD.json?"+Math.random(),
      }).then(function(data) {
            //var data = JSON.parse(data);  
            $('#FORNECEDOR_COD').html('');// limpo
            $('#FORNECEDOR_COD').append('<option value="" selected>::selecione::</option>'); 
            for( var i = 0 ; i < data.length ; i++ ){
                var selected = '';
                if(popular && getEntrada('FORNECEDOR_COD') == data[i].value)
                  selected = 'selected';
                $('#FORNECEDOR_COD').append('<option '+selected+' value=' + data[i].value + '>' + data[i].text + '</option>'); 
            } 

            $('#FORNECEDOR_COD').change(function(){
              popula_NRO_DO_DOCUMENTO(false,function(){});
            });               

            callbackFn();

      });
      /* FORNECEDOR_COD*/

}

function popula_CONDICAO_DE_PAGAMENTO_COD(popular,callbackFn){
      /* CONDICAO_DE_PAGAMENTO_COD*/
      $.ajax({ 
          url: path+ "/services/CONDICAO_DE_PAGAMENTO_COD.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data); 
            $('#CONDICAO_DE_PAGAMENTO_COD').html('');// limpo 
            $('#CONDICAO_DE_PAGAMENTO_COD').append('<option value="" selected>::selecione::</option>'); 
            for( var i = 0 ; i < data.length ; i++ ){
                var selected = '';
                if(popular && getEntrada('CONDICAO_DE_PAGAMENTO_COD') == data[i].value)
                  selected = 'selected';
                $('#CONDICAO_DE_PAGAMENTO_COD').append('<option '+selected+' value=' + data[i].value + '>' + data[i].text + '</option>'); 
            }   

            callbackFn();

      });
      /* CONDICAO_DE_PAGAMENTO_COD*/

}


function popula_CLASSIFICACAO_DESPESA_COD(popular,callbackFn){
      /* CLASSIFICACAO_DESPESA_COD*/
      $.ajax({ 
          url: path+ "/services/CLASSIFICACAO_DESPESA_COD.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data);  
            $('#CLASSIFICACAO_DESPESA_COD').html('');// limpo 
            $('#CLASSIFICACAO_DESPESA_COD').append('<option value="" selected>::selecione::</option>'); 
            for( var i = 0 ; i < data.length ; i++ ){
                
                if($('#NRO_DO_DOCUMENTO').val() == data[i].titulo){
                  var selected = '';
                  if(popular && getEntrada('CLASSIFICACAO_DESPESA_COD') == data[i].value)
                    selected = 'selected';
                  $('#CLASSIFICACAO_DESPESA_COD').append('<option '+selected+' value=' + data[i].value + '>' + data[i].text + '</option>'); 
                }

            } 

            callbackFn();

      });
      /* CLASSIFICACAO_DESPESA_COD*/

}

function popula_CENTRO_CUSTO_COD(popular,callbackFn){
      /* CENTRO_CUSTO_COD*/
      $.ajax({ 
          url: path+ "/services/CENTRO_CUSTO_COD.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data);  
            $('#CENTRO_CUSTO_COD').html('');// limpo 
            $('#CENTRO_CUSTO_COD').append('<option value="" selected>::selecione::</option>'); 
            for( var i = 0 ; i < data.length ; i++ ){
              if($('#EMPRESA_COD').val()==data[i].empresa){
                var selected = '';
                if(popular && getEntrada('CENTRO_CUSTO_COD') == data[i].value)
                  selected = 'selected';
                $('#CENTRO_CUSTO_COD').append('<option '+selected+' value=' + data[i].value + '>' + data[i].text + '</option>'); 
              }
            } 

            callbackFn();

      });
      /* CENTRO_CUSTO_COD*/

}

function populaSelects(){

      popula_SHOPPING(true,function(){
        popula_EMPRESA_COD(true,function(){
          popula_FORNECEDOR_COD(true,function(){
            popula_CONDICAO_DE_PAGAMENTO_COD(true,function(){        
              popula_NRO_DO_DOCUMENTO(true,function(){
                popula_CENTRO_CUSTO_COD(true,function(){
                  popula_CLASSIFICACAO_DESPESA_COD(true,function(){
                    popular();
                  });
                });
              });
            });
          });
        });
      });      

}

var entradasSalvas = [];
function salvaDados(callBackFn){

  if($( ".save" ).length == entradasSalvas.length)
    return callBackFn();

  var objsArray = $( ".save" ).toArray();
  setTimeout(function(){
    
    p.set('card', 'public', objsArray[entradasSalvas.length].id , String($( '#'+objsArray[entradasSalvas.length].id ).val()) );
    console.log( objsArray[entradasSalvas.length].id + ' : ' + String($( '#'+objsArray[entradasSalvas.length].id ).val()) );
    entradasSalvas.push({'name' : objsArray[entradasSalvas.length].id , 'value' : String($( '#'+objsArray[entradasSalvas.length].id ).val())});
    salvaDados(callBackFn);

  }, 200)

}


/* salvar */
function salvar(){

  var fromPhaseId = phase_1;
  var toPhaseId;
  if($('#MULTA_JUROS_COD').val() == 1){
    toPhaseId = $('#SHOPPING option:selected').attr('phases'); // phase 2
  }
  else
    toPhaseId = phase_4;

  p.moveCard(cardId, { phaseId: fromPhaseId}, {phaseId: toPhaseId}).then(moved => {
    console.log('## Move Card ##');
    console.log('phase : ' + toPhaseId);
  })  

  p.showNotification('Formulario salvo!', 'success');
  p.closeCard();  


}
/* salvar */ 

function disableForm(){
  $('#container').find('input, textarea, button, select').attr('disabled','disabled');
  $('#btnSalvar').hide();
  $('#radios_CPF_CNPJ').hide();
  $('.pp-ico-add').hide();
  
}



function popular(){
try{

  p.fields().then((fields) => {
    console.log(fields); 
  });

  console.log('## get ##');
  $( ".save" ).each(function( index ) {   
    $( '#' + $( this ).attr('id') ).val(getEntrada($( this ).attr('id')));
    console.log( $( this ).attr('id') + ' : ' + getEntrada($( this ).attr('id')) );
  });
  }catch(e){}
  
  showList();

}

function addLine(){

  if(!rc_showMesagesGrid('grid1')){
      var grupo = $( "#CLASSIFICACAO_DESPESA_COD" ).val();
      var centro = $( "#CENTRO_CUSTO_COD" ).val();
      var valor_custo = $( "#VALOR_GRID" ).val();

      /* insert db */
      db_insert(cardId,grupo,grupo,centro,centro,valor_custo);
      /* add line */
      grid_addLine(grupo,centro,valor_custo);
  }else{
      p.showNotification('Deve preencher os campos obrigatórios (*)', 'error');
      resize();
  }

}

function close(){

  if( !rc_showMesages() && !rc_showMesagesData() ){
      salvaDados(salvar);
  }else{
      p.showNotification('Deve preencher os campos obrigatórios (*)', 'error');
      resize();
  }
 
}

function resize(){
  PipefyApp.resizeTo("#list");
}

function populaVencimento(vencimento){
  $('#VENCIMENTO_ANTERIOR').val(vencimento);
}

function populaValor(valor){
  $('#VALOR').val(valor);
}

function showList(){
  $('#load').hide();
  $('#list').show();
  resize();
}




