import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES (${values})
      RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }

  async updateWithReturn(constraintColumns, oldValues, columns, values) {
    let condition = ' WHERE ';
    for (let index = 0; index < constraintColumns.length; index++) {
      const column = constraintColumns[index];
      const value = oldValues[index];
      if (index != constraintColumns.length - 1) {
        condition += ` ${column} = ${value} AND`;
      } else {
        condition += ` ${column} = ${value}`;
      }
    }
    let query = `UPDATE ${this.table} SET `;
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];
      const value = values[index];
      if (index != columns.length - 1) {
        query += `${column} = ${value}, `;
      } else {
        query += `${column} = ${value}`;
      }
    }
    query += condition;
    query += ' RETURNING *';
    return this.pool.query(query);
  }

  async deleteWithReturn(columns, values) {
    let condition = ' WHERE ';
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];
      const value = values[index];
      if (index != columns.length - 1) {
        condition += ` ${column} = ${value} AND`;
      } else {
        condition += ` ${column} = ${value}`;
      }
    }
    let query = `DELETE FROM ${this.table} `;
    query += condition;
    query += ' RETURNING *';
    return this.pool.query(query);
  }
}

export default Model;
