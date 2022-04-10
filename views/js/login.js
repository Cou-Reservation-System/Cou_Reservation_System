 //로그인
 function login() {
     $.ajax({
        type: "POST",
        url: "/admin/login",
        data: {
            id: $("id").val(),
            password: $("pass").val()
        },
        success: function(response) {
            localStorage.setItem("token", response.token);
            window.location.replace("/");  //로그인후 예약페이지 이동
        },
        error: function(error) {
            alert("로그인 실패 :" + error.responseJSON.errorMessage);
        }
     });
};


