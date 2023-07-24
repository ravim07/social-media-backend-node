// const Product = require("../model/product");
const Product = require("../modal/product");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const secretKey = "secratkey";

const addProduct = async (req, res, next) => {
  try {
    const { name, price, category, detail } = req.body;
    if (!name) {
      next("Please enter product Name");
    } else if (!price) {
      next("Please enter price");
    } else if (!category) {
      next("Please enter category");
    } else if (!detail) {
      next("Please enter product detail");
    } else {
      const productData = {
        name,
        price,
        category,
        detail,
      };
      jwt.verify(req.token, secretKey, async (err, authdata) => {
        if (err) {
          res.status(StatusCodes.UNAUTHORIZED).json({
            message: "unauthorized user!!",
          });
        } else {
          const { _id } = authdata;
          productData.user_id = _id;
          await Product.create(productData).then((data, err) => {
            if (err) {
              next(err);
            } else {
              return res.status(201).send("Product added sucessfully.");
            }
          });
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Something went wrong`,
    });
  }
};

const getProduct = async (req, res, next) => {
  try {
    jwt.verify(req.token, secretKey, async (err, authdata) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "unauthorized user!!",
        });
      } else {
        const { _id } = authdata;
        const allProduct = await Product.find();
        res
          .status(StatusCodes.OK)
          .json({ message: "user!!", product: allProduct });
      }
    });
  } catch {
    res.status(500).send({
      message: `Something went wrong`,
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    jwt.verify(req.token, secretKey, async (err, authdata) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "unauthorized user!!",
        });
      } else {
        // const product = Product.findOne({_id: req.params.todoID});

        await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name,
              detail: req.body.detail,
              price: req.body.price,
              category: req.body.category,
            },
          }
        );

        const { _id } = authdata;
        const allProduct = await Product.find({ user_id: _id });
        res.status(StatusCodes.OK).json({
          message: "Produc updated successfully!!",
          product: allProduct,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: `Something went wrong`,
    });
  }
};

const updateProductWithPatch = async (req, res, next) => {
  try {
    jwt.verify(req.token, secretKey, async (err, authdata) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "unauthorized user!!",
        });
      } else {
        await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              ...req.body,
            },
          }
        );

        const { _id } = authdata;
        const allProduct = await Product.find({ user_id: _id });
        res.status(StatusCodes.OK).json({
          message: "Product updated successfully!!",
          product: allProduct,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: `Something went wrong`,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    jwt.verify(req.token, secretKey, async (err, authdata) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "unauthorized user!!",
        });
      } else {
        if (req.params.id) {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please send id Also!!",
          });
        }
        await Product.findByIdAndDelete({ _id: req.params.id });

        const { _id } = authdata;
        const allProduct = await Product.find({ user_id: _id });
        res.status(StatusCodes.OK).json({
          message: "Product deleted successfully!!",
          product: allProduct,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: `Something went wrong`,
    });
  }
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  updateProductWithPatch,
  deleteProduct,
};
