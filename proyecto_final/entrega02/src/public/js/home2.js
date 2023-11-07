$(document).ready(function() {
    $('#addForm').submit(function(e) {
        e.preventDefault();

        const title = $('#title').val();
        const description = $('#description').val();
        const price = $('#price').val();
        const thumbnail = $('#thumbnail').val();
        const stock = $('#stock').val();
        const category = $('#category').val();

        $.ajax({
            url: 'http://127.0.0.1:8080/api/products',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                title: title,
                description: description,
                price: parseFloat(price),
                thumbnail: thumbnail,
                stock: parseInt(stock),
                category: category
            }),
            success: function(data) {
                alert('Producto agregado correctamente');
            },
            error: function() {
                alert('Error al agregar el producto');
            }
        });
    });
});
