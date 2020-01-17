$(function () {
    $('#datetimepicker').datetimepicker({
        locale: 'ru'
    });
});

$( function() {
    var places = [
        "Амбар",
        "Главный амбар",
        "Визжащие леса",
        "Потерянная бездна",
        "Песня смерти",
        "Мельница",
        "Озеро Ларсона"
    ];
    $( "#tags" ).autocomplete({
        source: places
    });
} );


window.operateEvents = {
    "click #button_order": function (e, value, row, index) {
        console.log(id);
        console.log(value);
        console.log($(this).find("input[name='customer.nameCustomer']").val());
        console.log($(this));


        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            type:"POST",
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token)
            },
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url:"/order",
            data: JSON.stringify(data),
            success:function(){
                table.bootstrapTable('remove', {
                    field: 'ID',
                    values: arrayIds  // row["ID"]

                });
                openForm();
            },
            error: function(e) {
                console.log(e);
            }
        })
    }};

// $(document).on('change', '.custom-select.from', function() {
//         var selected = $(this).val();
//
//         // $.ajax({
//         //     url: '<?php echo admin_url("admin-ajax.php") ?>',
//         //     type: 'POST',
//         //     data: {
//         //         action: 'myajax',
//         //         postID: selected
//         //     },
//         //     beforeSend: function(xhr) {},
//         //     success: function(data) {
//         //         $('.card-item-1').html(data);
//         //     },
//         //     error: function() {
//         //         alert('Error');
//         //     }
//         // });
// });