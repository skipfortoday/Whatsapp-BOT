const qrcode = require("qrcode-terminal");
const axios = require("axios");
const moment = require("moment");
const { Client } = require("whatsapp-web.js");
const client = new Client();

axios
  .get("https://api.kawalcorona.com/indonesia/provinsi")
  .then(function (response) {
    var list = response.data;
    function getFullProv(item) {
      var prov = [
        item.attributes.Provinsi,
        " : ",
        "Positif",
        item.attributes.Kasus_Posi,
        "Sembuh",
        item.attributes.Kasus_Semb,
        "Meninggal",
        item.attributes.Kasus_Meni,
      ].join(" ");
      return prov;
    }
    console.log(`Status Covid Per-Provinsi Indonesia
         ${moment().format("MMMM Do YYYY, h:mm:ss a")}
            ${list.map(getFullProv)}
              `);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body === "co-indo") {
    axios
      .get("https://api.kawalcorona.com/indonesia")
      .then(function (response) {
        console.log(response.data);
        message.reply(`Status Covid Indonesia 
        ${moment().format("MMMM Do YYYY, h:mm:ss a")}
        Positif = ${response.data[0].positif}
        Sembuh = ${response.data[0].sembuh}
        Meninggal = ${response.data[0].meninggal}
        Dirawat = ${response.data[0].dirawat}
      `);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  } else if (message.body === "co-prov") {
    axios
      .get("https://api.kawalcorona.com/indonesia/provinsi")
      .then(function (response) {
        var list = response.data;
        function getFullProv(item) {
          var prov = [
            item.attributes.Provinsi,
            " : ",
            "Positif",
            item.attributes.Kasus_Posi,
            "Sembuh",
            item.attributes.Kasus_Semb,
            "Meninggal",
            item.attributes.Kasus_Meni,
          ].join(" ");
          return prov;
        }
        message.reply(`Status Covid Per-Provinsi Indonesia
         ${moment().format("MMMM Do YYYY, h:mm:ss a")}
            ${list.map(getFullProv)}
              `);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  } else {
    message.reply(`Selamat Datang Di BOT Rizqi
        Berikut Adalah List Perintah yang tersedia :
        1. "co-indo" menampilkan status covid Indonesia
        2. "co-prov" info kode provinsi
        `);
  }
});

client.initialize();
