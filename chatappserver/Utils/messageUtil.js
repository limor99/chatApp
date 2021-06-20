const moment = require('moment');

function formatMessage(username, text, socketId) {
  return {
    username,
    text,
    time: moment().format('h:mm a'),
    socketId,
    read: false
  };
}

module.exports = formatMessage;