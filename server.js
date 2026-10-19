import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import product from "./products.js";

dotenv.config();

const app = express();
const PORT = 3333
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com o MONGODB")
    } catch (error) {
        console.log("Erro ao conectar ao MONGODB", error)
    };
};

connectDB();

app.post("/products", async (req, res) => {
    try {
        const novoProduto = await product.create(req.body)
        res.json(novoProduto)
    } catch (error) {
        res.json({ error: error.message })
    };

});

app.get("/products", async (req, res) => {
    try {
        const produtos = await product.find()
        res.json(produtos)
    } catch (error) {
        res.json({ error: error.message })
    };

});

app.put("/products/:id/update", async (req, res) => {
    try {
        const produtoAtualizado = await product.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json(produtoAtualizado)
    } catch (error) {
        res.json({ error: error.message })
    };

});

app.delete("/products/:id", async (req, res) => {
    try {
        const produtoDeletado = await product.findByIdAndDelete(req.params.id)
        res.json(produtoDeletado)
    } catch (error) {
        res.json({ error: error.message })
    };

});


app.get("/products/ativo", async (req, res) => {
    try {
        const produtos = await product.find({
            disponivel: true
        })
        res.json(produtos)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/products/categoria/:categoria", async (req, res) => {
    try {
        const produtos = await product.find({
            categoria: req.params.categoria
        })
        res.json(produtos)
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/products/price/:valor", async (req, res) => {
    try {
        const valor = Number(req.params.valor)

        if (valor < 0) {
            req.json({ error: "Preço inválido" })
        }

        const produtos = await product.find({
            preco: { $lt: valor }
        })

        res.json(produtos)

    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/products/low-stock", async (req, res) => {
    try {
        const produtos = await product.find({
            quantidade: { $lt: 5 }
        })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.patch("/products/:id/availability", async (req, res) => {
try {
    const produto = await product.findByIdAndUpdate(
        req.params.id,
        { disponivel: req.body.disponivel },
        { new: true }
    )
        res.json(produto)
        
} catch (error) {
    res.json({ error: error.message })
}

})

app.listen(PORT, () =>
    console.log("O servidor está rodando na porta: ", PORT)
);