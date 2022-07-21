const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAuthorisation,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

//Create

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyTokenAuthorisation, async (req, res) => {
  try {
    const updateCart = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete

router.delete("/:id", verifyTokenAuthorisation, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get  USER Cart

router.get("/find/:userId", verifyTokenAuthorisation,async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get ALL CART

router.get("/", verifyTokenAndAdmin ,async (req, res) => {
  
  try{

  const carts = await Cart.find()
  res.status(200).json(carts);


  }catch(err){
    res.status(500).json(err)
  }

})



module.exports = router;
