const path = require('path');

module.exports = {
  alias: {
    Src: path.resolve(__dirname, '../src/'),
    Utils: path.resolve(__dirname, '../src/utils/'),
    Components: path.resolve(__dirname, '../src/components/'),
    Config: path.resolve(__dirname, '../src/config.js/'),
    Actions: path.resolve(__dirname, '../src/actions/'),
    StatusCodes: path.resolve(__dirname, '../src/statusCodes.js'),
    Img: path.resolve(__dirname, '../src/img/'),
  },
};
