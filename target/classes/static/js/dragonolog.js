function detailFormatter(index,row) {
    var html = [];
    $.each(row, function(key,value){
        html.push('<p class="row" style="width:100%"><b class="col-md-2">'+ key +'</b><span class="col-md-10"> '+ value +'</span></p>')
    });
    return html.join('')
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

var rowTable;
var indexTable;
var table;

function openForm() {
    document.getElementById("popUpForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popUpForm").style.display = "none";
}

window.operateEvents = {
    "click .lan-remove": function (e, value, row) {
        var id = {id: row["ID"]};

        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        table = $("#langTable");
        var arrayIds = [];
        arrayIds.push(row["ID"]);
        console.log(arrayIds);

        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token)
            },
            headers: {
                'Content-Type': 'application/json'
            },
            url: "/dragon/del",
            data: JSON.stringify(id),
            success: function () {
                table.bootstrapTable('remove', {
                    field: 'ID',
                    values: arrayIds

                });
                openForm();
            },
            error: function (e) {
                alert('Удаление не удалось!');
            }
        })
    },

    "click .lan-edit": function(e, value, row, index) {
        console.log(row);
        console.log(index);
        rowTable = row;
        indexTable = index;
        table = $("#langTable");
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        e.preventDefault();
        e.stopPropagation();
        var dragon = {id :row["ID"], name :row["Имя"],
            classDragon: row["Класс"], busy: row["Заказ"],
            patient: row["Лечение"]};


        $('#editForm input#inputDragonId').val(dragon.id);
        $('#editForm input#inputDragonName').val(dragon.name);
        $('#editForm input#inputDragonClassD').val(dragon.classDragon);
        $('#editForm select#inputDragonBusy').val(dragon.busy);
        $('#editForm select#inputDragonPatient').val(dragon.patient);
        $('#editForm select#inputDragonBusy option:selected').removeAttr("selected");
        $('#editForm select#inputDragonBusy option[value="' + dragon.busy + '"]')
            .attr('selected', 'selected');
        $('#editForm select#inputDragonPatient option:selected').removeAttr("selected");
        $('#editForm select#inputDragonPatient option[value="' + dragon.patient + '"]')
            .attr('selected', 'selected');
        $("#editForm").modal('show');
    }
};

$(document).on("click", '#saveDragonButton', function(e) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    e.preventDefault();
    e.stopPropagation();
    console.log(rowTable);
    console.log(indexTable);

    var busyD = document.getElementById("inputDragonBusy").value;
    if (busyD=='Да'){busyD ='true'} else {busyD='false'}
    var patientD = document.getElementById("inputDragonPatient").value;
    if (patientD=='Да'){patientD ='true'} else {patientD='false'}

    var dragon = {id: document.getElementById("inputDragonId").value,
        name: document.getElementById("inputDragonName").value,
        classDragon: document.getElementById("inputDragonClassD").value,
        busy: busyD,
        patient: patientD };
    console.log(dragon);

    var busyUpdT;
    var patUpdT;
    if (dragon.busy=="true"){busyUpdT ='Да'} else {busyUpdT='Нет'}
    if (dragon.patient=="true"){patUpdT ='Да'} else {patUpdT='Нет'}
    console.log(busyUpdT);
    console.log(patUpdT);

    $.ajax({
        type:"POST",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token)
        },
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:"/saveDragon",
        data: JSON.stringify(dragon),
        success:function(){
            console.log("ssssssssss");
            $("#closeEditForm").click();
            table.bootstrapTable('updateRow', {
                index: indexTable,
                row: {
                    ID: dragon.id,
                    "Имя": dragon.name,
                    "Класс": dragon.classDragon,
                    "Заказ":busyUpdT,
                    "Лечение": patUpdT
                }
            });
            openForm();
        },
        error: function() {
            console.log("fail");

        }
    })

});