import {Router} from "express";
import _CartDao from "../dao/carts.dao.js";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const carts = await _CartDao.getCarts()
    res.status(200).json(carts)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})

router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid
    const cart = await _CartDao.getCartProducts(cid)
    res.status(200).json(cart)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})




router.post('/', async (req, res) => {
  try {
    const cart = await _CartDao.createCart(req.body)
    res.status(200).json(cart)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await _CartDao.updateCart(cid, pid)

    cart
      ? res.status(200).json(cart)
      : res.status(400).send("Bad request")
  }
  catch(error) {
    res.json({ error: error.message })
  }
})




router.put('/:cid', async (req, res) => {
  try {
    const product = await _CartDao.updateCartProducts(req.params.cid, req.body)
    res.status(200).json(product)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})

router.put('/:cid/products/:pid', async (req, res) => {
  try{
    const { cid, pid } = req.params
    const quantity = parseInt(req.body.quantity, 10)

    if (quantity <= 0)
      return res.status(400).send("quantity must be greater than 0")

    return res.status(200).json(await _CartDao.updateCart(cid, pid, quantity))
  }
  catch(error) {
    res.json({ error: error.message })
  }
})


  router.delete('/:cid', async (req, res) => {
  try {
    const product = await _CartDao.deleteCartById(req.params.cid)
    res.status(200).json(product)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})

router.delete('/:cid/products', async (req, res) => {

})

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await _CartDao.deleteProductById(cid, pid)


    res.status(200).json(cart)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})

export default router;