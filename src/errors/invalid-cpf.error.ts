class InvalidCPF extends Error {
  constructor(msg: string = 'CPF is not valid') {
    super(msg);

    this.name = 'InvalidCPF';
  }
}

export default InvalidCPF;
