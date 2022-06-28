import postgres from 'postgres'

const sql = postgres('postgres://postgres:postgres@localhost:5433/gopher');

export default sql
