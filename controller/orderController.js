const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Create a new order
const createOrder = async (req, res) => {
  const { products } = req.body;

  const existingProducts = await prisma.product.findMany({
    where: {
      productName: { in: products.map((p) => p.productName) },
    },
  });

  // const totalAmount = existingProducts.reduce((sum, p) => {
  //   const orderedProduct = products.find(
  //     (op) => op.productName === p.productName
  //   );
  //   return sum + p.price * orderedProduct.quantity;
  // }, 0);

  //stock verification
  for (const p of existingProducts) {
    const orderedProduct = products.find(
      (op) => op.productName === p.productName
    );

    if (p.quantityInStock < orderedProduct.quantity) {
      return res.status(400).json({
        message: `Insufficient stock for ${p.productName}`,
      });
    }
  }

  // Transaction: deduct stock + create order
  const newOrder = await prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    for (const p of existingProducts) {
      const orderedProduct = products.find(
        (op) => op.productName === p.productName
      );

      totalAmount += p.price * orderedProduct.quantity;

      await tx.product.update({
        where: { productId: p.productId },
        data: {
          quantityInStock: { decrement: orderedProduct.quantity },
        },
      });
    }

    return tx.order.create({
      data: {
        orderuserId: req.user.userId,
        totalAmount,
        products: existingProducts.map((p) => p.productName),
      },
    });
  });
  // const newOrder = await prisma.order.create({
  //   data: {
  //     totalAmount,
  //     products: existingProducts.map((p) => p.productName),
  //     orderuserId: req.user.userId,
  //   },
  // });
  res.send(newOrder);
};

//get an order

const getOrder = async (req, res) => {
  //const user = req.user;
  const { orderId } = req.params;
  const findorder = await prisma.order.findUnique({
    where: { orderId: parseInt(orderId) },
  });

  if (!findorder) {
    return res.status(404).send({ message: "Order not found" });
  } else {
    if (findorder.orderuserId !== req.user.userId) {
      return res
        .status(403)
        .send({ message: "Oops, It looks like thats not your order" });
    } else {
      res.send(findorder);
    }
  }
};

module.exports = {
  createOrder,
  getOrder,
};
