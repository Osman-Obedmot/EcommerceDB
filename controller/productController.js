const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// get a list of all products
const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
};

// create a new product
const createProduct = async (req, res) => {
  const { productName, description, price, quantityInStock, category } =
    req.body;
  const newProduct = await prisma.product.create({
    data: {
      productName,
      description,
      price,
      quantityInStock,
      category,
    },
  });
  res.send(newProduct);
};

//update an existing product
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { productName, description, price, quantityInStock, category } =
    req.body;
  const updatedProduct = await prisma.product.update({
    where: {
      productId: parseInt(productId),
    },
    data: {
      productName,
      description,
      price,
      quantityInStock,
      category,
    },
  });
  res.send(updatedProduct);
};

// delete a product
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await prisma.product.delete({
    where: {
      productId: parseInt(productId),
    },
  });
  res.send(deletedProduct);
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
