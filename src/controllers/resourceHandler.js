import Model from '../models/model';

class ResourceHandler {
  constructor(resource) {
    this.model = new Model(resource);
  };

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
