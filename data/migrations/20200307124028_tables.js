
exports.up = async function(knex) {
    await knex.schema.createTable("projects", (tbl) => {
        tbl.increments()
        tbl.text("name", 128)
            .unique()
            .notNullable()
        tbl.text("description", 128)
        tbl.boolean("complete")
            .defaultTo(0)
            .notNullable()
    })

    await knex.schema.createTable("tasks", (tbl) => {
        tbl.increments()
        tbl.text("name", 128)
            .unique()
            .notNullable()
        tbl.text("description", 128)
            .notNullable()
        tbl.text("notes", 128)
        tbl.boolean("complete")
            .defaultTo(0)
            .notNullable()
        tbl.integer("project_id")
            .references("id")
            .inTable("projects")
    })

    await knex.schema.createTable("resources", (tbl) => {
        tbl.increments()
        tbl.text("name", 128)
            .unique()
            .notNullable()
        tbl.text("description", 128)
    })

    await knex.schema.createTable("projects_resources", (tbl) => {
        tbl.integer("project_id")
            .references("id")
            .inTable("projects")
        tbl.integer("resources_id")
            .references("id")
            .inTable("resources")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("projects_resources")
    await knex.schema.dropTableIfExists("resources")
    await knex.schema.dropTableIfExists("tasks")
    await knex.schema.dropTableIfExists("projects")
};
