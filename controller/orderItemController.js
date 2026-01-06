const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient();

// Create a new order item
const createOrderItem = async (req, res) => {
    const newOrderItem = await prisma.orderItem.create({
        data: {
            quantity: req.body.products.quantity,
        }
    })
}

module.exports = {
    createOrderItem,
};