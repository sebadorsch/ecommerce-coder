import { Router } from "express";
import _CartDao from "../dao/carts.dao.js";
import _ProductDao from "../dao/products.dao.js"

const router = Router();

router.get('/', async (req, res) => {
  try {
    const carts = await _CartDao.getCarts()
    res.status(200).json(carts)
  }
  catch(error) {
    console.log('ERROR')
    res.json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const cart = await _CartDao.getCartById(id)
    res.status(200).json(cart)
  }
  catch(error) {
    console.log('ERROR')
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
    const product = await _ProductDao.getProductById(pid)
    console.log(product)

    if(!product)
      res.status(400).send("Bad request")

    const cart = await _CartDao.updateCart(cid, product.id)
    cart
      ? res.status(200).json(cart)
      : res.status(400).send("Bad request")

  }
  catch(error) {
    res.json({ error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const product = await _ProductDao.updateProduct(req.params.id, req.body)
    res.status(200).json(product)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const product = await _ProductDao.deleteProduct(req.params.id)
    res.status(200).json(product)
  }
  catch(error) {
    res.json({ error: error.message })
  }
})

export default router;