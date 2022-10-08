const express = require("express")
const Contenedor = require("../getItems")
const productRouter = express.Router();

const contenedorProducts = new Contenedor("productos.txt")

productRouter.get("/", async(req, res) => {
    try {
        const productosAMostrar = await contenedorProducts.getAll()
        res.json(productosAMostrar)
    } catch (error) {
        res.status(500).send("Hubo un error en el Servidor")
    }
})

productRouter.get("/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const productoPorID = await contenedorProducts.getByID(parseInt(id));

        if (productoPorID) {
            res.json({
                message: "El producto Solicitado es: ",
                product: productoPorID
            });
        } else {
            res.json({
                message: `No Se encontro el producto de id: ${id}`,
            });
        }
    } catch (error) {
        res.status(500).send("Hubo un error en el Servidor")
    }
})

productRouter.post("/", async(req, res) => {
    try {
        const newProduct = req.body;
        productoAAgregar = await contenedorProducts.save(newProduct)
        if (productoAAgregar == false) {
            res.json({
                message: `El producto con ${newProduct.title}, ya existe, por favor no repita productos`
            })
        } else {
            const productosAMostrar = await contenedorProducts.getAll()
            res.json({
                message: "Producto Agregado con exito!",
                product: productosAMostrar
            })
        }
    } catch (error) {
        res.status(500).send("Hubo un error en el Servidor")
    }
})

productRouter.put("/:id", async(req, res) => {
    const { id } = req.params;
    const datoActualizado = req.body;
    try {
        const productoAActualizar = await contenedorProducts.updateById(parseInt(id), datoActualizado);
        if (productoAActualizar != undefined) {
            res.json({
                message: `El producto id:${id} Fue actualizado con exito`,
                response: productoAActualizar
            })
        } else {
            res.json({
                message: `El id ${id}, no es un dato valido para actualizar`
            })
        }
    } catch (error) {
        res.status(500).send("Hubo un error en el Servidor")
    }
})


productRouter.delete("/:id", async(req, res) => {
    const { id } = req.params
    try {
        productoAEliminar = await contenedorProducts.deleteByID(parseInt(id))
        res.json({
            message: productoAEliminar
        })
    } catch (error) {

    }
})

module.exports = productRouter