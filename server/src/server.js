const app = require('./app');
require('dotenv').config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server has started on port', PORT);
});