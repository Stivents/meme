const bot = require("./src/telegram/bot")
// cargamos los metodos
const { searchImages } = require("./src/telegram/inline");
require("./src/telegram/message");

// Verificar que el bot se conectó correctamente a la API de Telegram
bot.getMe().then((me) => {
  console.log(`El bot se ha conectado correctamente como @${me.username}`);

  // Cuando se envía una consulta inline con el bot "@your_bot" se ejecuta la siguiente función
  bot.on("inline_query", (msg) => {
    const query = msg.query; // Consulta inline recibida
    const offset = msg.offset ? parseInt(msg.offset) : 0; // Offset actual
    const { results, nextOffset } = searchImages(query, offset); 

    bot.answerInlineQuery(msg.id, results, {
      cache_time: 0,
      next_offset: nextOffset,
    });
  });
});

