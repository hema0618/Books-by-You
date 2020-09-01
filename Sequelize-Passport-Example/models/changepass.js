// Changes the user's password.
$(document).on('click', '#newPassword', function () {
	var old = document.getElementById('oldPass').value;
	var newP = document.getElementById('newPass').value;
	$.ajax({
        method: "post",
        url: "BookstoreServlet",
        data: {
        	"changePass": "changePass",
            "oldPassword": $("#oldPass").val(),
            "newPassword": $("#newPass").val()
        },
        success: function (responseText) {
            if(responseText == "Success") {
                $("form").remove();
                var p = $('<p id="successs""></p>');
                p.append("Your password was successfully changed! Please click on the button below to log in.")
                var a = $('<a class="btn btn-primary" href="login.html">Go To Login!</a>')
                $("#error").remove();
                $("#change").append(p);
                $("#change").append(a);
            }
        },
        error: function () {
            var p = $('<p id="error" style="color:red"></p>');
            $("#error").remove();
            p.append("The old password you entered seems to be incorrect. Please try again");
            $("body").append(p);
        }
    });
});