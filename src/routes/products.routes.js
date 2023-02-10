import { Router } from "express";
import _ProductDao from "../dao/products.dao.js";

const router = Router();

const validSort = ['asc', 'desc', 'ascending', 'descending', '1', '-1']

router.get('/', async (req, res) => {
  try {
    const query = req.query

    const limit = query.limit || '10'
    delete query.limit

    const page = query.page || '1'
    delete query.page

    const sort = validSort.includes(query['sort']) ? query['sort'] : 'asc'
    delete query.sort

    const params = {
      'limit': limit,
      'page': page,
      'sort': sort,
    }

    const productsResult = await _ProductDao.getProducts(params, query)

    let response = {
      status: 'success',
      payload: productsResult.docs,
    }

    delete productsResult.docs

    Object.assign(response, productsResult);

    response['prevLink'] = response.hasPrevPage ? `${req.url}` : null
    response['nextLink'] = response.hasNextPage ? `${req.url}` : null

    res.status(200).json(response)
  }
  catch(error) {
    res.json({
      status: 'error',
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const products = await _ProductDao.getProductById(id)
    res.status(200).json(products)
  }
  catch(error) {
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