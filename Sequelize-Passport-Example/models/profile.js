$(document).ready(function() {
	var check;
	// Checks if the user is logged in.
	$.ajax({
		type: "POST",
		url: "BookstoreServlet",
		data: {
			"checkLogin" : "checkLogin"
		}, dataType: "json",
		async:"false",
		success: function(responseText) {
			
			// Removes some links depending on usertype.
			if (responseText != "Customer")
				{
					$("#addressTab").remove();
					$("#creditTab").remove();
				}
			// Redirect to login.html if the user is not logged in.
			if (responseText == '0')
				{
				check = 0;
				window.location.href = "login.html";
				}
			// Update the home tab to go to the correct user homepage.
			else
				{
				$.ajax({
					type: "POST",
					url: "BookstoreServlet",
					data: {
						"changeHome" : "changeHome"
					}, dataType: "json",
					async:"false",
					success: function(responseText) {
						$("#home").attr("href", responseText);
					}
				});
				
				// Sets the values for the profile page.
			  $.ajax({
			    method : "post",
			    url : "BookstoreServlet",
			    data : {
			      "viewProfile" : "viewProfile"
			    }, dataType : "json",
			    success : function(responseText) {
			      $("#fname").val(responseText.fname);
			      console.log(responseText);
			      $("#lname").val(responseText.lname);
			      $("#email").val(responseText.email);
			      $("#phone").val(responseText.phone);
			      if (responseText.subscribe == true)
			    	  {
			    	  	$("#sub").prop("checked", true);
			    	  }
			      else
			    	  {
			    	  	$("#sub").prop("checked", false);
			    	  }
			    },
			    error : function() {
			      alert("error occured");
			    }
			  });
			  $("body").show();
			}
		}
	});
});