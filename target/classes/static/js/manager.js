

function detailFormatter(index,row) {
    var html = [];
    $.each(row, function(key,value){
        html.push('<p class="row" style="width:100%"><b class="col-md-2">'+ key +'</b><span class="col-md-10"> '+ value +'</span></p>')
    });
    return html.join('')
}

// function totalFormatter() {
//     return 'Итого:'
// }
// function sumFormatter(data) {
//     var field = this.field
//     return data.map(function (row) {
//         return +row[field].substring(0)
//     }).reduce(function (sum, i) {
//         return sum + i
//     }, 0) + ' мон.'
// }


function openForm() {
    document.getElementById("popUpForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popUpForm").style.display = "none";
}

function closeEditForm() {
    $("form#editForm").trigger('reset');
    document.getElementById("editForm").style.display = "none";
}

function closeAddForm() {
    $("form#addForm").trigger('reset');
    document.getElementById("addForm").style.display = "none";
}

function operateFormatter(value, row, index) {
    return [
        '<a class="lan-edit" href="javascript:void(0);" title="Edit">',
        '<i class="fas fa-pen" style="margin-right:5px"></i>',
        '</a>',
        '<a class="lan-remove" href="javascript:void(0);" title="Remove">',
        '<i class="fa fa-trash"></i>',
        '</a>'].join(' ');
}


// $('td#status').click(function(){
//     var stat = $(this).text();
//     $(this).html('');
//     $('<input></input>')
//         .attr({
//             'type': 'text',
//             'name': 'fstatus',
//             'id': 'txt_status',
//             'size': '30',
//             'value': status
//         })
//         .appendTo('#status');
//     $('#txt_status').focus();
// });
//
// $(document).on('blur','#txt_status', function(){
//     var name = $(this).val();
//     $.ajax({
//         type: 'post',
//         url: 'change-name.xhr?name=' + stat,
//         success: function(){
//             $('#status').text(stat);
//         }
//     });
// });

var rowTable;
var indexTable;
var table;

window.operateEvents = {
    "click .lan-remove": function (e, value, row) {
        var id = {id : row["ID"]};

        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        table = $("#langTable");
        var arrayIds = [];
        arrayIds.push(row["ID"]);
        console.log(arrayIds);

        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            type:"POST",
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token)
            },
            headers: {
                'Content-Type': 'application/json'
            },
            url:"/listOrders/del",
            data: JSON.stringify(id),
            success:function(){
                table.bootstrapTable('remove', {
                    field: 'ID',
                    values: arrayIds

                });
                openForm();
            },
            error: function(e) {
                alert('Удаление не удалось!');
            }
        })
    },

    "click .lan-edit": function(e, value, row, index) {
        rowTable = row;
        indexTable = index;
        table = $("#langTable");
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        e.preventDefault();
        e.stopPropagation();
        var orderr = {id :row["ID"], status :row["Статус"],
            timeTravel: row["Создан"], startAddress: row["Откуда"],
            destAddress: row["Куда"], classD: row["Класс"],dragon: row["Дракон"], sum: row["Итого"]};
        var cust = { nameCustomer : row["Клиент"], phoneNumber: row["Телефон"]};
        var json = {order: orderr, customer: cust};
        console.log(json);

        $('#editForm input#inputOrderId2').val(orderr.id);
        $('#editForm input#inputOrderClassD2').val(orderr.classD);
        $('#editForm input#inputCustomer2').val(cust.nameCustomer);
        $('#editForm input#inputPhone2').val(cust.phoneNumber);
        $('#editForm input#inputDeparture2').val(orderr.startAddress);
        $('#editForm input#inputArrival2').val(orderr.destAddress);
        $('#editForm input#inputTime2').val(orderr.timeTravel);
        $("#editForm select#inputDrago2").empty();
        loadListDragon(orderr.classD);
        $('#editForm input#inputTotal2').val(orderr.sum);
        //К селектам тоже добавить значения
        $('#editForm select#inputOrderStatus2 option:selected').removeAttr("selected");
        $('#editForm select#inputOrderStatus2 option[value="' + orderr.status + '"]')
            .attr('selected', 'selected');
        $('#editForm select#inputDrago2 option:selected').removeAttr("selected");
        $('#editForm select#inputDrago2 option[value="' + orderr.dragon + '"]')
            .attr('selected', 'selected');
        $("#editForm").modal('show');

        console.log(row);

        // row["Статус"].innerText = $('#editForm select#inputOrderStatus2').attr('value');

    }
};


$(document).on("click", '#saveOrderButton', function(e, value, row, index) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    e.preventDefault();
    e.stopPropagation();
    var orderr = {//status: document.getElementById("inputOrderStatus").value,
        timeTravel: document.getElementById("inputTime").value,
        startAddress: document.getElementById("inputDeparture").value,
        destAddress: document.getElementById("inputArrival").value,
        classD: document.getElementById("inputOrderClassD").value};
        //dragon: document.getElementById("inputDrago").value,
        //sum: document.getElementById("inputTotal").value};

    var cust = { nameCustomer : document.getElementById("inputCustomer").value,
        phoneNumber: document.getElementById("inputPhone").value};
    var json = {order: orderr, customer: cust};
    console.log(json);
    console.log("Yeeees");

    $.ajax({
        type:"POST",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token)
        },
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:"/saveOrder",
        data: JSON.stringify(json),
        success:function(){
            console.log("ssssssssss");
            $("#closeAddForm").click();
            table.bootstrapTable('append', {
                    // ID: orderr.id,
                    "Статус": "Получен",
                    "Создан": orderr.timeTravel,
                    "Клиент": cust.nameCustomer,
                    "Телефон": cust.phoneNumber,
                    "Откуда": orderr.startAddress,
                    "Куда": orderr.destAddress,
                    "Класс": "Не назначен",
                    "Дракон": '',
                    "Итого": "Не назначена"
                }
            );
            openForm();
        },
        error: function() {
            // console.log(e.responseText);
            console.log("fail");

        }
    })

});



$(document).on("click", '#saveEditOrderButton', function(e, value, row, index) {
    console.log(rowTable);
    console.log(indexTable);
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    e.preventDefault();
    e.stopPropagation();
    var orderr = {id: document.getElementById("inputOrderId2").value,
        status: document.getElementById("inputOrderStatus2").value,
        timeTravel: document.getElementById("inputTime2").value,
        startAddress: document.getElementById("inputDeparture2").value,
        destAddress: document.getElementById("inputArrival2").value,
        classD: document.getElementById("inputOrderClassD2").value,
        dragon: document.getElementById("inputDrago2").value,
        sum: document.getElementById("inputTotal2").value};
            // ("#editForm select#inputTotal2").attr('value')};

    var cust = { nameCustomer : document.getElementById("inputCustomer2").value,
        phoneNumber: document.getElementById("inputPhone2").value};
    var json = {order: orderr, customer: cust};
    console.log(json);
    console.log("Yeeees");

    $.ajax({
                type:"POST",
                beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token)
            },
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url:"/listOrders",
                data: JSON.stringify(json),
                success:function(){
                    console.log("ssssssssss");
                    $("#closeEditForm").click();
                    table.bootstrapTable('updateRow', {
                            index: indexTable,
                            row: {
                                ID: orderr.id,
                                "Статус": orderr.status,
                                "Создан": orderr.timeTravel,
                                "Клиент": cust.nameCustomer,
                                "Телефон": cust.phoneNumber,
                                "Откуда": orderr.startAddress,
                                "Куда": orderr.destAddress,
                                "Класс": orderr.classD,
                                "Дракон": orderr.dragon,
                                "Итого": json.order.sum
                        }}
                    );
                    openForm();
                },
                error: function() {
                    // console.log(e.responseText);
                    console.log("fail");

                }
        })

});

function loadListDragon(classD){
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
        type:"POST",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token)
        },
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:"/getNamesDragon",
        data: JSON.stringify({classDragon : classD}),
        success:function(result){
            console.log("suc");
            console.log(result);
            if (result.length == 0){
                $('#editForm select#inputDrago2').append('<option id="' + 0 + '">'
                    + "На данный момент нет свободных драконов!" + '</option>');
            }
            for( var name in result) {
                console.log(result[name]['name']); //и т.д.
                $('#editForm select#inputDrago2').append('<option value="'
                    + result[name]['name'] + '">'
                    + result[name]['name'] + '</option>');
            }
        },
        error: function() {
            console.log("fail");

        }
    })
}

function updateForm() {
    // event.preventDefault();
    // event.stopPropagation();
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
        type:"GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token)
        },
        url:"/listOrders",
        success:function(html){
            $('body').html(html);
            console.log("update");
        },
        error: function() {
            // console.log(e.responseText);
            console.log("fail");

        }
    })
}

function openEditForm() {
    document.getElementById("editForm").style.display = "block";
}