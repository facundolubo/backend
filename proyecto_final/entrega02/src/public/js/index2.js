$(document).ready(function() {
    const table = $('#productsTable tbody');

    const socket = io();

    socket.on('updatedProducts', function(data) {
        table.empty(); // Clear the table body before adding new rows

        $.each(data, function(index, product) {
            let row = $('<tr>');
            row.append($('<td>').text(product.title));
            row.append($('<td>').text(product.description));
            row.append($('<td>').text(product.price));
            row.append($('<td>').text(product.code));
            row.append($('<td>').text(product.stock));
            row.append($('<td>').text(product.category));
            table.append(row);
        });
    });
});
