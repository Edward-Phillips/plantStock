import { dropTables, stupidSolution } from '../src/utils/queryFunctions';

before(async () => {
  await stupidSolution();
});

after(async () => {
  await dropTables();
});
