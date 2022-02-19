class EntityNotFound extends Error {
  constructor(msg: string) {
    super(msg);

    this.name = 'Entity Not Found';
  }
}

export default EntityNotFound;
