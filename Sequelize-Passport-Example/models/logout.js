// Shows the transactions for an order.

$(document).on('click', ".transact", function(){
	var orderNumber = $(this).val();
	if($('#' + orderNumber).is(':visible')){
		$('#' + orderNumber).hide(1000);
	}
	else{
		$('#' + orderNumber).show(1000);
	}
});