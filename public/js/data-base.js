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

    //'query': '{ card(id: '+cardId+') { id fields { name value } } }'

  var body = {
    'query': '{  card(id: '+cardId+') {    id    fields {      name      value    }    child_relations {      cards {        id        phases_history {          firstTimeIn          lastTimeOut          phase {            id            name          }        }        fields {          name          value        }      }      name      source_type    }    parent_relations {      cards {        id        fields {          name          value        }      }      name      source_type    }  }}'
    //'query': '{ card(id: '+cardId+') { id fields { name value } child_relations { cards { id fields { name value } } name source_type } parent_relations { cards { id fields { name value } } name source_type } } }'
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
                var value = fields[x].value; 
                value = value.replace('["', "");
                value = value.replace('"]', "");
                return  value; 

            }

          }

        } 

      }

    }else{

        for(var i = 0 ; i<data.card.fields.length ; i++){
          if(name == data.card.fields[i].name ) 
            return  data.card.fields[i].value; 
        }

    }

    return '';

}


/* get_date */

function db_get_date(name , data){
    
    var relations = data.card.child_relations;
    for(var i = 0 ; i<relations.length ; i++){
      if(name == relations[i].name ){

        var cards = relations[i].cards;
        if(cards.length > 0){

          var phases_history = cards[cards.length-1].phases_history; // pego o utimo card
          for(var x = 0 ; x<phases_history.length ; x++){

            if(name == phases_history[x].phase.name ) 
              return  phases_history[x].lastTimeOut; 

          }

        }

      } 

    }

    return '';

}


/* get_date */




