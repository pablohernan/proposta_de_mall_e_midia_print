//https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html

// jQuery
$.getScript('./js/jquery.mask.js', function()
{

	$('.mask-number').mask('#', {placeholder: "CPF/CNPJ"});

	$('.mask-date').mask('00/00/0000', {placeholder: "__/__/____"});

  $('.mask-time').mask('00:00:00', {placeholder: "__:__:__"});

  $('.mask-date_time').mask('00/00/0000 00:00:00', {placeholder: "__/__/____ __:__:__"});

  $('.mask-cep').mask('00000-000', {placeholder: "00000-000"});

  $('.mask-phone').mask('0000-0000', {placeholder: "0000-0000"});

  $('.mask-phone_with_ddd').mask('(00) 0000-0000', {placeholder: "(__) ____-____"});

  $('.mask-phone_us').mask('(000) 000-0000', {placeholder: "(___) ___-____"});

  $('.mask-mixed').mask('AAA 000-S0S', {placeholder: "00:00:00"});

  $('.mask-cpf').mask('000.000.000-00', {reverse: true , placeholder: "___.___.___-__"});

  $('.mask-cnpj').mask('00.000.000/0000-00', {reverse: true, placeholder: "00:00:00"});

  $('.mask-money').mask('000.000.000.000.000,00', {reverse: true, placeholder: "__.___.___/____-__"});

  $('.mask-money2').mask("#.##0,00", {reverse: true, placeholder: "_,__ R$"});

  $('.mask-ip_address').mask('099.099.099.099', {placeholder: "___.___.___.___"});

  $('.mask-percent').mask('##0,00%', {reverse: true, placeholder: "_,__%"});

  $('.mask-clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true, placeholder: "__/__/____"});

  $('.mask-placeholder').mask("00/00/0000", {placeholder: "__/__/____"});

  $('.mask-selectonfocus').mask("00/00/0000", {selectOnFocus: true, placeholder: "__/__/____"});


  // original form 
    $('.money').val('0,00');
    $('.money').maskMoney({
      thousands:'.', decimal:',', 
      allowZero:true , 
      precision:2, 
      allowNegative:true
    });
    
    $('.valorCalculoDecimal1').val('0,0');
    $('.valorCalculoDecimal1').maskMoney({
      thousands:'.', decimal:',', 
      allowZero:true , 
      precision:1, 
      allowNegative:true
    });
    
    //$('.valorSingularidade').val('0,00000');
    $('.valorSingularidade').maskMoney({
      thousands:'.', decimal:',', 
      allowZero:true , 
      precision:5, 
      allowNegative:true
    });

    
    $('.percentDois').mask('#.###.##0,00%', {reverse: true});
    $('.percentUm').mask('#.###.#0,0%', {reverse: true});

});