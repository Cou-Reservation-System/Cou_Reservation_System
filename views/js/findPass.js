//비밀번호 찾기 페이지 이동
function findPass() {
    $.ajax({
        type: "POST",
        url: "/admin/findPassword",
        data: {
            id: $("#id").val(),
            email: $("#email").val()
        },
        success: function (response) {
            
        }
    });
 };

function findPassBtn () {
    $.ajax({
        type: "PUT",
        url: "/admin/resetPassword",
        data: {
            id: $("#id").val(),
            email: $("#email").val()
        },
        success: function (response) {
            

        }
    });
};




