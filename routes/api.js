const express = require('express');
const apiRouter = express.Router();

const customersRouter = require('./customers');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const genresRouter = require('./routes/genres');
const orderItemsRouter = require('./routes/order_items');
const ordersRouter = require('./routes/orders');

apiRouter.use('/customers', customersRouter);
apiRouter.use('/authors', authorsRouter);
apiRouter.use('/books', booksRouter);
apiRouter.use('/genres', genresRouter);
apiRouter.use('/order_items', orderItemsRouter);
apiRouter.use('/orders', ordersRouter);

module.exports = apiRouter;