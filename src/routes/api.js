const express = require('express');
const apiRouter = express.Router();

const customersRouter = require('./customers');
const authorsRouter = require('./authors');
const booksRouter = require('./books');
const genresRouter = require('./genres');
const orderItemsRouter = require('./orderItems');
const ordersRouter = require('./orders');

apiRouter.use('/customers', customersRouter);
apiRouter.use('/authors', authorsRouter);
apiRouter.use('/books', booksRouter);
apiRouter.use('/genres', genresRouter);
apiRouter.use('/order_items', orderItemsRouter);
apiRouter.use('/orders', ordersRouter);

module.exports = apiRouter;