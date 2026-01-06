const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const productSchema = require("../validater-joi/products.schema");

const allowedRole = require("../middleware/role");

const productController = require("../controller/productController");

//create a new product by admin
router.post(
  "/",
  allowedRole.allowRoles("ADMIN"),
  validate(productSchema.createProductSchema),
  productController.createProduct
);

//get all products
router.get("/", productController.getProducts);

//update a product by admin
router.patch(
  "/:productId",
  allowedRole.allowRoles("ADMIN"),
  validate(productSchema.updateProductSchema),
  productController.updateProduct
);

//delete a product by admin
router.delete(
  "/:productId",
  allowedRole.allowRoles("ADMIN"),
  productController.deleteProduct
);

module.exports = router;
