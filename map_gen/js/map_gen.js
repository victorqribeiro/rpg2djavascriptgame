$(document).ready(function(){
    //disabilita seleção
    jQuery.fn.disableTextSelect = function() {
	return this.each(function() {
		$(this).css({
			'MozUserSelect':'none',
			'webkitUserSelect':'none'
		}).attr('unselectable','on').bind('selectstart', function() {
			return false;
		});
	});
};
 
jQuery.fn.enableTextSelect = function() {
	return this.each(function() {
		$(this).css({
			'MozUserSelect':'',
			'webkitUserSelect':''
		}).attr('unselectable','off').unbind('selectstart');
	});
};

    $('.disablecopy').disableTextSelect();

    //gera array dos mapas
    $("#array_mapa").append("mapa = [<br>");
    for(var i=0; i<16; i++){
        for(var j=0; j<16; j++){
            $("#editor_mapa").append("<div class='mapa_color'>"+j+"x"+i+"</div>");
            if( j == 15){$("#editor_mapa").append("<br>"); }
            if(j == 0){ $("#array_mapa").append("["); }
            $("#array_mapa").append("<span id=col"+j+"x"+i+">1</span> ");
            if(j < 15){$("#array_mapa").append(","); }
            if(j == 15 && i < 15){ $("#array_mapa").append("],<br>"); }
            
        }
    }
    $("#array_mapa").append("]<br>];");
    var img = new Image();
    img.src = "../sprites/mapa.jpg";
    img.onload = texturas();
    function texturas(){
    for(var i=0; i > -512; i-=32){
    for(var j=0; j > -512; j-=32){

        $('#tools_mapa').append("<div class='textura' style='background-image: url("+img.src+"); width:32px; height:32px; background-position:"+j+"px "+i+"px; display:inline-block;'> </div>");

    }
    }
    }
    
    var isDown = false;   // Tracks status of mouse button

    $(document).mousedown(function() {
        isDown = true;      // When mouse goes down, set isDown to true
    }).mouseup(function() {
        isDown = false;    // When mouse goes up, set isDown to false
    });
    
    //seleciona textura
    var valorText = 0;
    $(".textura").click(function(){
        valorText = $(this).index();
    });
    
    //posiciona no mapa
    $(".mapa_color").mousedown(function(){
        //$(this).empty();
        //$(".textura").eq(valorText).clone().appendTo(this);
        var img = $(".textura").eq(valorText).css('background-image');
        var pos = $(".textura").eq(valorText).css('background-position');
        $(this).css({'background-image': img, 'background-position': pos});
        var val = $(this).html();
        $("#col"+val+"").html( valorText );
    });
    
    $(".mapa_color").hover(function(){
        if(isDown == true){
        var img = $(".textura").eq(valorText).css('background-image');
        var pos = $(".textura").eq(valorText).css('background-position');
        $(this).css({'background-image': img, 'background-position': pos});
        var val = $(this).html();
        $("#col"+val+"").html( valorText );
        }
    });
    
    
    $("#grid").click(function(){
        $(".mapa_color").toggleClass("border");
        $(this).toggleClass("gridOFF");
    });
});