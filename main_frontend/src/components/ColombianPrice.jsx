import React from 'react';


function formatToColombianPesos(price) {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
        const formattedPrice = numericPrice.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        });
        return formattedPrice;
    } else {
        return 'Precio no válido';
    }
}

export function ColombianPrice({ price }) {
    const formattedPrice = formatToColombianPesos(price);
    return <span>{formattedPrice}</span>;
}
