import Poco from "commodetto/Poco";
import Bitmap from "commodetto/Bitmap";
import qrCode from "qrcode";

import Message from "pebble/message";

var Clay = require('@rebble/clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig);

const moddableProxy = require("@moddable/pebbleproxy");
Pebble.addEventListener('ready', moddableProxy.readyReceived);
Pebble.addEventListener('appmessage', moddableProxy.appMessageReceived);

console.log("Hello, Poco QRCode.");

const render = new Poco(screen);

const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);

function pad(n, l) {
  n = String(n);
  while (n.length < l) { n = "0" + n; }
  return n;
}

function generate_token(android_id) {
  var salt = "SCOTTJOHN";
  var time = Math.floor((new Date()).getTime() / 300000);
  var token = sha256(android_id + salt + time);
  token = token.substr(0, 6);
  token = pad(parseInt(token, 16), 8);
  console.log("token=" + token);
  return token;
}

function build_qr_data(membership_id, android_id) {
  const APPLICATION_IDENTIFIER = "96";
  const SUB_TYPE = "000";
  const RESERVED_FOR_FUTURE = "00";
  const DIGITAL_TOKEN_VERSION = "01";
  const qr_data =
    APPLICATION_IDENTIFIER +
    SUB_TYPE +
    pad(membership_id, 13) +
    RESERVED_FOR_FUTURE +
    DIGITAL_TOKEN_VERSION +
    generate_token(android_id);
  console.log("QR Data=" + qr_data);
  return qr_data;
}

function main() {
  const code = qrCode({
    input: build_qr_data("112039651736", "ecf5c794a8d10099"),
    bitmap: 32,
    fit: Math.min(render.width, render.height) - 10
  });

  const bitmap = new Bitmap(code.size, code.size, Bitmap.MonochromeAligned, code, 0);
  render.begin();
    render.fillRectangle(white, 0, 0, render.width, render.height);
    render.drawMonochrome(bitmap, black, white, (render.width - bitmap.width) >> 1, (render.height - bitmap.height) >> 1);
  render.end();
}

const message = new Message({
    keys: ["BackgroundColor", "TextColor", "TemperatureUnit", "ShowDate", "HourFormat"],
    onReadable() {
        const msg = this.read();

        const membership_id = msg.get("MembershipId");
        if (bg !== undefined) {
            settings.MembershipId = membership_id;
        }
      
        const android_id = msg.get("AndroidId");
        if (bg !== undefined) {
            settings.AndroidId = android_id;
        }

        saveSettings();
        updateColors();
        drawScreen();

        // Re-fetch weather if temperature unit changed
        if (tu !== undefined) {
            requestLocation();
        }
    }
});

main();
