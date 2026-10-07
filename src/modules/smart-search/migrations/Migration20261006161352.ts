import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261006161352 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "smart_searches" drop constraint if exists "smart_searches_customer_id_search_type_unique";`,
    );
    this.addSql(
      `create table if not exists "smart_searches" ("id" text not null, "customer_id" text not null, "sales_channel_id" text not null, "search_type" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "smart_searches_pkey" primary key ("id"));`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_smart_searches_deleted_at" ON "smart_searches" ("deleted_at") WHERE deleted_at IS NULL;`,
    );
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_smart_searches_customer_id_search_type_unique" ON "smart_searches" ("customer_id", "search_type") WHERE deleted_at IS NULL;`,
    );

    this.addSql(
      `create table if not exists "search_item" ("id" text not null, "title" text not null, "content" text not null, "search_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "search_item_pkey" primary key ("id"));`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_search_item_search_id" ON "search_item" ("search_id") WHERE deleted_at IS NULL;`,
    );
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_search_item_deleted_at" ON "search_item" ("deleted_at") WHERE deleted_at IS NULL;`,
    );

    this.addSql(
      `alter table if exists "search_item" add constraint "search_item_search_id_foreign" foreign key ("search_id") references "smart_searches" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "search_item" drop constraint if exists "search_item_search_id_foreign";`,
    );

    this.addSql(`drop table if exists "smart_searches" cascade;`);

    this.addSql(`drop table if exists "search_item" cascade;`);
  }
}
