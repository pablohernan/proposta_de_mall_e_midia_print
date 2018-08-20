/*
ALTERACAOPAGAMENTO_GRID1

CARDID
INDEX
GRUPODEPAGAMENTO
GRUPODEPAGAMENTOID
CENTRODECUSTO
CENTRODECUSTOID
VALOR
*/

var apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxMzI5NjcsImVtYWlsIjoicHJhcGV0dGlAZ21haWwuY29tIiwiYXBwbGljYXRpb24iOjQ2MzF9fQ.jXx183WEqstCvgJkxQHFN72IMNklPqdM5IT0txevy_S5PPdQ_bcKaflGGVE1YjFrP7aX7XS7pdxjrMk27CHN8A';
var tableId = "UXvncDbC";


/* insert */
function db_insert(cardid,grupodepagamento,grupodepagamentoid,centrodecusto,centrodecustoid,valor){

  var request = new XMLHttpRequest();

  request.open('POST', 'https://app.pipefy.com/queries');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer '+apiKey);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      /*
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
      */
      var index = JSON.parse(this.responseText).data.table.table_records_count + 1;
      db_insert_index(index,cardid,grupodepagamento,grupodepagamentoid,centrodecusto,centrodecustoid,valor,db_insertCallBackFn);

    }    
  };

  var body = {
    'query': 'query {table(id: "'+tableId+'") {table_records_count}}'
  };
  request.send(JSON.stringify(body));

}

function db_insert_index(index,cardid,grupodepagamento,grupodepagamentoid,centrodecusto,centrodecustoid,valor,callBackFn){

  var request = new XMLHttpRequest();

  request.open('POST', 'https://app.pipefy.com/queries');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer '+apiKey);

  request.onreadystatechange = function () {
    callBackFn(this);
  };

  var body = {
    'query': 'mutation { createTableRecord( input: { '+    
    'table_id: "'+tableId+'"  '+    
    'fields_attributes: ['+        
      '{ field_id: "cardid", field_value: "'+cardid+'" },'+        
      '{ field_id: "index", field_value: "'+index+'" }, '+       
      '{ field_id: "grupodepagamento", field_value: "'+grupodepagamento+'" },'+    
      '{ field_id: "grupodepagamentoid", field_value: "'+grupodepagamentoid+'" },'+       
      '{ field_id: "centrodecusto", field_value: "'+centrodecusto+'" },'+        
      '{ field_id: "centrodecustoid", field_value: "'+centrodecustoid+'" },'+        
      '{ field_id: "valor", field_value: "'+valor+'" },'+
    ']}  ) {table_record { id } }}'
  };
  request.send(JSON.stringify(body));
}

function db_insertCallBackFn(response){
    if (response.readyState === 4) {
      /*
      console.log('Status:', response.status);
      console.log('Headers:', response.getAllResponseHeaders());
      console.log('Body:', response.responseText);
      */
    }
}

/* insert */





/* count */
function db_count(){

  var request = new XMLHttpRequest();

  request.open('POST', 'https://app.pipefy.com/queries');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer '+apiKey);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      /*
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
      */
    }
  };

  var body = {
    'query': 'query {table(id: "'+tableId+'") {table_records_count}}'
  };
  request.send(JSON.stringify(body));

}

/* count */


/* select */

function db_select(callBackFn){

  var request = new XMLHttpRequest();

  request.open('POST', 'https://app.pipefy.com/queries');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer '+apiKey);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      /*
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
      */

      var ret = new Array();
      var edges = JSON.parse(this.responseText).data.table_records.edges;
      for(var i = 0; i< edges.length ; i++){
          var itens = edges[i].node.record_fields;
          var obj = {}
          for(var x = 0; x<itens.length ; x++){
              obj[itens[x].name] = itens[x].value;
          }
          ret.push(obj);
      }
      callBackFn(ret);
    }
  };

  var body = {
    'query': '{ table_records( table_id: "'+tableId+'") { edges { node { id record_fields { name value } } } }}'
  };

  request.send(JSON.stringify(body));

}


/* select */



/* get parent  */

function db_get_parent(cardId, callBackFn){

  var request = new XMLHttpRequest();

  request.open('POST', 'https://app.pipefy.com/queries');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer '+apiKey);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      /*
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
      */

      callBackFn( JSON.parse(this.responseText) );
    }
  };

  var body = {
    'query': '{  card(id: '+cardId+') {    id    parent_relations {      cards {        id      }    }  }}'
  
  };


  request.send(JSON.stringify(body));

}
/* get parent  */


/* get_fields */

function db_get_fields(cardId, callBackFn){

  var request = new XMLHttpRequest();

  request.open('POST', 'https://app.pipefy.com/queries');

  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer '+apiKey);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      /*
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
      */

      callBackFn( JSON.parse(this.responseText) );
    }
  };

  var body = {
    'query': '{  card(id: '+cardId+') {    id    finished_at     phases_history {  phase {        id        name      }   lastTimeOut    }    fields {      name      value    }    child_relations {      cards {        id        finished_at        fields {          name          value        }      }      name      source_type    }  }}'
  };


  request.send(JSON.stringify(body));

}


function db_get_field(name , data){
    
    var childName = '';
    if(name.indexOf('.')>-1){
      var arrName = name.split('.');
      childName = arrName[0];
      name = arrName[1];
    }

    if(childName && childName != ''){ // otro pipe relacionado

      var relations = data.card.child_relations;
      for(var i = 0 ; i<relations.length ; i++){
        if(childName == relations[i].name ){

          var cards = relations[i].cards;
          if(cards.length > 0){

            var fields = cards[cards.length-1].fields; // pego o utimo card
            for(var x = 0 ; x<fields.length ; x++){

              if(name == fields[x].name ) 
                return formatFieldResult(fields[x].value);
            }

          }

        } 

      }

    }else{

        for(var i = 0 ; i<data.card.fields.length ; i++){
          if(name == data.card.fields[i].name ) 
            return  formatFieldResult(data.card.fields[i].value); 
        }

    }

    return '';

}


/* get_date */

function db_get_date(name , data){
  
    // regra da DM
    var hist = data.card.phases_history;    
    if(name == 'Start form'){
      if(hist.length > 2)
        if(hist[hist.length-1].lastTimeOut === null)
          return formatDateResult(hist[hist.length-2].lastTimeOut);
        else
          return formatDateResult(hist[hist.length-1].lastTimeOut);
      else
        return '';
    }

    // outros não Start form
    for(var i = 0 ; i<hist.length ; i++){
      if(name == hist[i].phase.name ){
          return formatDateResult(hist[i].lastTimeOut);
      } 

    }



/*
    var relations = data.card.child_relations;
    for(var i = 0 ; i<relations.length ; i++){
      if(name == relations[i].name ){

        var cards = relations[i].cards;
        if(cards.length > 0){

          return formatDateResult(cards[cards.length-1].finished_at);

        }

      } 

    }
*/
    return '';

}


/* get_date */


function formatFieldResult(result){
  return result.replace('["', "").replace('"]', "").trim(); 
}

function formatDateResult(date){
  if(date !== null)
    return moment(date).format('DD.MM.YYYY, h:mm:ss a');
  else 
    return '';
}  




