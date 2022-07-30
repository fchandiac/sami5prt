const translate = {}

var es_ES = {
    search: {
        placeholder: 'Busqueda...',
    },
    sort: {
        sortAsc: 'Ordenar la columna en orden ascendente',
        sortDesc: 'Ordenar la columna en orden descendente',
    },
    pagination: {
        previous: 'Anterior',
        next: 'Siguiente',
        navigate: function (page, pages) { return "P\u00E1gina " + page + " de " + pages; },
        page: function (page) { return "P\u00E1gina " + page; },
        showing: 'Mostrando los resultados',
        of: 'de',
        to: 'a',
        results: ' ',
    },
    loading: 'Cargando...',
    noRecordsFound: 'Sin productos',
    // noRecordsFound: '  ',
    error: 'Se produjo un error al recuperar datos',
};

translate.es_ES = es_ES
module.exports = translate
