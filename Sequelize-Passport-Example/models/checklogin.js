// Checks to see if a user is logged in.
$(document).ready(function loadPage() {
	$.ajax({
		type: "POST",
		url: "BookstoreServlet",
		data: {
			"checkLogin" : "checkLogin"
		}, dataType: "json",
		async:"false",
		success: function(responseText) {
			
			if (responseText != '0')
				{
					$.ajax({
						type: "POST",
						url: "BookstoreServlet",
						data: {
						"name" : "name"
						}, dataType: "json",
						async:"false",
						success: function(responseText) {
						var response = "Welcome, " + responseText;
						$("#welcome").append(response);
						}
					});
					$("body").show();
				}
			else
				{
				window.location.href = "login.html";
				}
		}
	});
});