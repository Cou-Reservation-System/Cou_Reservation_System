//초기 세팅
function findPassSetting() {
    const temp_html = `
        <div class="inputWrap" id="inputWrap">
         <div class="id">
            <input id="id" type="text" placeholder="아이디" />
             </div>
             <div class="email">
             <input id="email" type="text" placeholder="EMAIL" />
             </div>
             </div>
             <div class="btnWrap">
             <button onclick="findPass()" id="findPassBtn" type="button">입력하기</button>
             </div>
             `
    $('#mainWrap').append(temp_html);

}

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
            const id = response.id
            $('#id').hide()
            $('#email').hide()
            $('#findPassBtn').hide()
            const temp_html = `<div class="inputWrap" id="inputWrap">
            <div class="newPass">
               <input id="newPass" type="text" placeholder="새 비밀번호" />
                </div>
                <div class="newPassCon">
                <input id="newPassCon" type="text" placeholder="새 비밀번호 확인" />
                </div>
                </div>
                <div class="btnWrap">
                <button onclick="changePass(${id})" id="changePassBtn" type="button">비밀번호 변경하기</button>
                </div>`
            $('#mainWrap').append(temp_html);
   
        }
    });
 };

function changePassBtn (id) {
    $.ajax({
        type: "PUT",
        url: "/admin/resetPassword",
        data: {
            id,
            newPass: $("#newPass").val(),
            newPassCon: $("#newPassCon").val()
        },
        success: function (response) {
            window.location.replace("/")

        }
    });
};