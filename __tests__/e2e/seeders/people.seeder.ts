import { IPeople } from '../../../src/helpers/interfaces/entities/people.interface';
import People from '../../../src/schemas/people.schema';

const PeopleSeeder = {
  handle: async (): Promise<IPeople[]> => [
    await People.create({
      nome: 'Diogo Alexandre',
      cpf: '68206259015',
      data_nascimento: new Date('2002-02-23'),
      email: 'other-valid-email@mail.com',
      senha: '$2a$08$n70.qf8BdMqvn78pMWWpG.FKGH2aW4KbmOC6J5SRBqVxtocZYqNTy',
      habilitado: 'sim',
    }),
    await People.create({
      nome: 'Joazinho',
      cpf: '01374993026',
      data_nascimento: new Date('1992-02-23'),
      email: 'joazinho@mail.com',
      senha: '$2a$08$n70.qf8BdMqvn78pMWWpG.FKGH2aW4KbmOC6J5SRBqVxtocZYqNTy',
      habilitado: 'nao',
    }),
  ],
};

export default PeopleSeeder;
