import {
  dropTables,
  createTables,
  insertIntoTables,
  createAndInsertIntoTables,
  stupidSolution
} from '../src/utils/queryFunctions';

before(async () => {
  await stupidSolution();
});

after(async () => {
  await dropTables();
});
