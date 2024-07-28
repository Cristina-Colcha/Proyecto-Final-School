const conversiones = {
    'm-km': (valor) => valor / 1000,
    'km-m': (valor) => valor * 1000,
    'cm-m': (valor) => valor / 100,
    'm-cm': (valor) => valor * 100,
    'km-cm': (valor) => valor * 100000,
    'cm-km': (valor) => valor / 100000,
    'm-mm': (valor) => valor * 1000,
    'mm-m': (valor) => valor / 1000,
    'in-m': (valor) => valor * 0.0254,
    'm-in': (valor) => valor / 0.0254,
    'ft-m': (valor) => valor * 0.3048,
    'm-ft': (valor) => valor / 0.3048,
    'yd-m': (valor) => valor * 0.9144,
    'm-yd': (valor) => valor / 0.9144,
    'mi-m': (valor) => valor * 1609.344,
    'm-mi': (valor) => valor / 1609.344,
};

module.exports = {
    convertir: (unidad, valor) => {
        const conversion = conversiones[unidad];
        if (conversion) {
            return conversion(valor);
        } else {
            throw new Error('Conversión no soportada');
        }
    }
};
