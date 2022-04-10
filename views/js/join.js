//회원가입
function join() {
    $.ajax({
        type: "POST",
        url: "/admin/join",
        data: {
            id: $("#id").val(),
            email: $("#email").val(),
            password: $("#pass").val(),
            confirmPassword: $("#passCheck").val()
        },
        success: function (response) {
            alert("회원가입을 축하합니다.");
            console.log("회원가입 완료");
            window.location.replace("/login");
        },
        error:function (error) {
            alert("회원가입 실패: " + error.responseJSON.errorMessage);
        }
    });
};
