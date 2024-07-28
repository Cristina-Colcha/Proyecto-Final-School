const express = require('express');
const bodyParser = require('body-parser');
const attendanceRoutes = require('./routes/attendanceRoutes');
const path = require('path');

const app = express();
const PORT = 3008;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/attendance', attendanceRoutes);
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
