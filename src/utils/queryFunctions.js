import { pool } from '../models/pool';
import {
  insertProducts,
  dropProductsTable,
  createProductsTable,
  insertStock,
  createStockTable,
  stupidAsyncSQL,
} from './queries';

export const executeQueryArray = async (arr) => new Promise((resolve) => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const dropTables = () => executeQueryArray([ dropProductsTable ]);
export const createTables = () => executeQueryArray([ createProductsTable, createStockTable ]);
export const insertIntoTables = () => executeQueryArray([ insertProducts, insertStock ]);
export const stupidSolution = () => executeQueryArray([ stupidAsyncSQL ]);
export const createAndInsertIntoTables = () => executeQueryArray([ createProductsTable, createStockTable ]);
