import { createTables, insertIntoTables, stupidAsyncWorkaround, createAndInsertIntoTables } from './queryFunctions';

(async () => {
  await createAndInsertIntoTables();
})();
