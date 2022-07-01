import postgres from 'postgres';

const sql = postgres({
  idle_timeout: 20,
  max: 100,
  max_lifetime: 60 * 10,
  transform: {
    column: {
      to: postgres.fromCamel,
      from: postgres.toCamel,
    },
  },
  types: {
    date: {
      to: 1184,
      from: [1082, 1083, 1114, 1184],
      serialize: (date) => date,
      parse: (date) => date,
    },
  },
});

export default sql;
