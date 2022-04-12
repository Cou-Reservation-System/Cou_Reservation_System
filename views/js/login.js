 //로그인
 function login() {
     $.ajax({
        type: "POST",
        url: "/admin/login",
        data: {
            id: $("#id").val(),
            password: $("#pass").val()
        },
        success: function(response) {
            localStorage.setItem("token", response.token);
            window.location.replace("/adminReserve");  //로그인후 예약페이지 이동
        },
        error: function(error) {
            alert("로그인 실패 :" + error.responseJSON.errorMessage);
        }
     });
};

// //로그인 인증
// function getSelf(callback) {
//     $.ajax({
//       type: "POST",
//       url: "/admin/auth",
//       headers: {
//         "Authorization": `Bearer ${localStorage.getItem("token")}`,
//       },
//       success: function (response) {
//         callback(response.user);
//       },
//       error: function (xhr, status, error) {
//         console.log(xhr,status,error)
//         if (status == 401 || error=="Unauthorized") {
//           alert("로그인이 필요합니다.");
//         } else {
//           localStorage.clear();
//           alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
//         }
//         window.location.href = "/";
//       },
//     });
//   }

