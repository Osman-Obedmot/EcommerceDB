
const app = require('./app')

const PORT = 5550;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});