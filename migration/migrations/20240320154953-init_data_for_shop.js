const knex = require('knex')({
    client: 'pg',
    connection: 'postgresql://postgres:P@ssw0rd@localhost:8004/gop_db_20270227?schema=public',
    debug: false,
})

const {ObjectId} = require('mongodb')


module.exports = {
    async up(db, client) {
        const products = await knex.select('sku', 'description').from('inventory_items')
            .where({show_online: true})
            .limit(100)

        await db.collection('products').insertMany(
            products.map(p => ({
                createdBy: new ObjectId('65c3acd9bd70ac73e64ead07'),
                sku: p.sku,
                title: p.description,
                createdAt: new Date(),
                updatedAt: new Date()
            }))
        )

        const people = await knex.select('first_name','last_name').from('contacts')
            .where({is_customer: true})
            .limit(100)

        await db.collection('people').insertMany(
            people.map(p => ({
                createdBy: new ObjectId('65c3acd9bd70ac73e64ead07'),
                title: `${p.first_name} ${p.last_name}`,
                isCustomer: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        )
    },

    async down(db, client) {

    }
}
