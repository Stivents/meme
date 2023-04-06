const images = require("../assets/data.json");
const diacritic = require("diacritic");
const RESULTS_PER_PAGE = 10;

// Función que busca imágenes por término de búsqueda si

function searchImages(query, offset) {
  try {
    // Si no se proporciona ninguna consulta, devolver todas las imágenes
    if (!query) {
      const startIndex = offset;
      const endIndex = offset + RESULTS_PER_PAGE;
      const slicedResults = images.slice(startIndex, endIndex);
      return {
        results: slicedResults.map((result) => {
          return {
            type: "photo",
            id: result.id,
            photo_file_id: result.photo_id,
            thumb_file_id: result.photo_id, // file_id de la miniatura de la imagen
          };
        }),
        nextOffset: endIndex >= images.length ? "" : endIndex.toString(),
      };
    }

    // Convertimos la búsqueda a minúsculas para hacerla insensible a mayúsculas y minúsculas
    const lowerCaseQuery = diacritic.clean(query.toLowerCase());
    // Buscamos imágenes que contengan el término de búsqueda en su caption, normalizando el texto de los captions
    const results = images.filter((image) => {
      const normalizedCaption = diacritic.clean(image.caption?.toLowerCase());
      return normalizedCaption.includes(lowerCaseQuery);
    });
    // Calculamos los índices de inicio y fin de los resultados a mostrar
    const startIndex = offset;
    const endIndex = offset + RESULTS_PER_PAGE;
    const slicedResults = results.slice(startIndex, endIndex);
    // Devolvemos los resultados encontrados
    return {
      results: slicedResults.map((result) => {
        return {
          type: "photo",
          id: result.id,
          photo_file_id: result.photo_id,
          thumb_file_id: result.photo_id, // file_id de la miniatura de la imagen
        };
      }),

      nextOffset: endIndex >= results.length ? "" : endIndex.toString(),
    };
  } catch (error) {
    console.error(error);
    // Manejar el error aquí
  }
}

module.exports = {
  searchImages,
};
