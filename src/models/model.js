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
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
      INSERT INTO ${this.table}(${columns})
      VALUES (${values})
      RETURNING *
      `;
    return this.pool.query(query);
  }

  async updateWithReturn(constraintColumns, oldValues, columns, values) {
    let condition = ' WHERE ';
    // need to refactor
    condition += Model.queryStitcher(constraintColumns, oldValues);
    //  need to refactor
    let query = `UPDATE ${this.table} SET `;
    query += Model.queryStitcher(columns, values, ',');
    query += condition;
    query += ' RETURNING *';
    return this.pool.query(query);
  }

  async deleteWithReturn(columns, values) {
    let condition = ' WHERE ';
    condition += Model.queryStitcher(columns, values);
    let query = `DELETE FROM ${this.table} `;
    query += condition;
    query += ' RETURNING *';
    return this.pool.query(query);
  }

  async getById(id) {
    const condition = ` WHERE id = ${id}`;
    return this.select('*', condition);
  }

  static queryStitcher(columns, values, lineBreaker = ' AND') {
    let queryAddition;
    for (let index = 0; index < columns.length - 1; index++) {
      const column = columns[index];
      const value = values[index];
      queryAddition += ` ${column} = ${value}${lineBreaker}`;
    }
    queryAddition += ` ${column} = ${value}`;
    return queryAddition;
  }
}

export default Model;
