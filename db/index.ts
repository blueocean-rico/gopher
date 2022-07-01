import postgres from 'postgres';

const sql = postgres({
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
