function copyURL() {
    var copyText = document.getElementById("tfm-permalink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}
// end

jQuery(document).ready(function($) {

	"use strict";

        $(".tfm-copy-link button").click(function(){
            $(".tfm-permalink").addClass("copied");
            $(".copy-text").hide( );
            $(".copy-text.success").fadeIn(300);

    		// remove class after delay
    		setTimeout(function() {
			$(".tfm-permalink").removeClass("copied");
            $(".copy-text").fadeIn( 300);
            $(".copy-text.success").hide( );
            $("#tfm-permalink").blur(); 
		}, 3000);

        });

        $(document).on("click","button.toggle-share",function(e){
            $(this).next('.tfm-share-wrapper').toggleClass('show');
            $(this).toggleClass('close');
        });

});
