import Model from '../models/model';

class ResourceHandler {
  constructor(resource) {
    this.model = new Model(resource);
  }

  async getResources(columns) {
    try {
      const data = await this.model.select(columns);
      return data.rows;
    } catch (err) {
      return err.stack;
    }
  }

  async addResource(columns, values) {
    try {
      const data = await this.model.insertWithReturn(columns, values);
      return data.rows;
    } catch (err) {
      return err.stack;
    }
  }
}

export default ResourceHandler;
