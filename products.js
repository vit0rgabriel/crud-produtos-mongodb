import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
    {
        nome: String,
        categoria: String,
        preco: Number,
        quantidade: Number,
        disponivel: Boolean
    },
    { collection: "products" }
);

export default mongoose.model("products", ProductsSchema)