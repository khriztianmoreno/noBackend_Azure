var App = {
    init: function(){        
        this.client = new WindowsAzure.MobileServiceClient("urlServicio","key");        
        this.$table = $('#tblTablaContactos > tbody');
        this.fetch();
    },
    fetch:function(){
        this.todoItemTable = this.client.getTable('contactos');
    },
    save: function (item) {
        this.client.getTable("Contactos").insert(item).then(null, this.handleError);       
    },
    handleError: function(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<div>').text(text));
    },
    refreshTodoItems: function () {
        var query = this.todoItemTable ;
        query.read().then(function(todoItems) {
            listItems = $.map(todoItems, function(item) {
                return $('<tr>').attr('data-id', item.id)
                    .append($('<td>').append(item.name))
                    .append($('<td>').append(item.address))
                    .append($('<td>').append(item.cellphone))
                    .append($('<td>').append(item.email))
                    .append($('<td>')
                        .append
                            (
                                $('<button>').attr('class', 'btn btn-primary btn-xs edit-element')
                                .append($('<span>').attr('class', 'glyphicon glyphicon-pencil'))
                            ))
                    .append($('<td>')
                        .append
                            (
                                $('<button>').attr('class', 'btn btn-primary btn-xs remove-element')
                                .append($('<span>').attr('class', 'glyphicon glyphicon-trash'))
                            ));
            });
            $('#tblTablaContactos > tbody').empty().append(listItems).toggle(listItems.length > 0);
        });
    },
    remove: function(id){
        this.todoItemTable.del({ id: id }).then(this.refreshTodoItems, this.handleError);
    },
    update:function(id, item){
        this.todoItemTable.update({ id: id, name: item.name, address: item.address, cellphone:item.cellphone, email:item.email }).then(this.refreshTodoItems, this.handleError);
    }
};
            
