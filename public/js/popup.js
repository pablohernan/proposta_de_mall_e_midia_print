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
      
     // try{
        p = PipefyApp.init();
        //PipefyApp.resizeTo("#list");
        
        //PipefyApp.render(function(){
        //});

        

        p.card().then(function(card) {
          console.log('CARD_ID:'+card.id) // { id: '23abc', ... }
          cardId = card.id;
          init();
          console.log(card.current_phase.id);
        });
     // }catch(e){console.log(e)}

});




function init(){
	
}
