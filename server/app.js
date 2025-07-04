let express = require('express');
let cors = require('cors');
let app = express();
let mongoose = require('mongoose');
const TodoRoutes = require('./routes/TodoRoutes');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use('/api/todo',TodoRoutes)

// db connection

mongoose.connect(process.env.DBURL ).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port http://localhost:${process.env.PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});