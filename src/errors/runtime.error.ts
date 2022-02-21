class RuntimeError extends Error {
  constructor(msg: string) {
    super(msg);

    this.name = 'Runtime Error';
  }
}

export default RuntimeError;
