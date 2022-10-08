const express = require("express");
const app = express();
const productRouter = require("./routes/products");

app.listen(8080, () => {
    console.log("server on port 8080")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productRouter)