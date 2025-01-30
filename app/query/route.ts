import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
 return await sql`
    SELECT invoices.amount, customers.name
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  WHERE invoices.amount = 666;
  `;
}

export async function GET() {
  try {
    console.log(`here`)
    const result = await sql.begin((sql) => [
      listInvoices(),
    ]);
    console.log(`result:`, result)

    return Response.json({ message: 'Database seeded successfully', result });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
