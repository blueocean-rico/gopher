import postgres from 'postgres';

const sql = postgres('postgres://postgres:postgres@localhost:5433/gopher', {
  transform: {
    column: {
      to: postgres.fromCamel,
      from: postgres.toCamel,
    },
  },
});

export default sql;
