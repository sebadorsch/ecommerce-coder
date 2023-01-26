import { Router } from "express";
import _ProductDao from "../dao/products.dao.js";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await _ProductDao.getProducts()
    res.status(200).json(products)
  }
  catch(error) {
    console.log('ERROR')
    res.json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const products = await _ProductDao.getProductById(id)
    res.status(200).json(products)
  }
  catch(error) {
    console.log('ERROR')
    res.json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const product = await _ProductDao.createProduct(req.body)
    res.status(200).json(product)
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