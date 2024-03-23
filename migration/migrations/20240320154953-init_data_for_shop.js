const knex = require('knex')({
    client: 'pg',
    connection: 'postgresql://postgres:P@ssw0rd@localhost:1000/gop-db-20240225-2?schema=public',
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
                createdBy: new ObjectId('65ce806cae1252302f277548'),
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
                createdBy: new ObjectId('65ce806cae1252302f277548'),
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
