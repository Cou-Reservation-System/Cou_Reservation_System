// 초기 default 값 날짜 조회
function getDate() {
    const temp_html = ``
    $('').appned(temp_html)
}

// 차량 조회 버튼 누를 시
function getCar() {
    $.ajax({
        type: 'GET',
        url: `/admin/check/carNumber/${carNum}`,
        data: {
            
        },
        success: function(response) {
            
            $('').hide()
            $('').hide()
            $('').hide()
            const temp_html = ``
            $('').append(temp_html)
        }

    })
}

// 날짜조회에서 조회 버튼 누를 시
function searchDate() {
    $.ajax({
        type: 'GET',
        url: '/admin/check/calender',
        data: {

        },
        success: function(response) {

        }
    })
}

// 차량조회에서 조회버튼 누를 시
function searchDate() {
    $.ajax({
        type:'GET',
        url: '',
    })
}