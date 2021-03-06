# Migration `20210522160037-create-places`

This migration has been generated by Ignacio De La Madrid at 5/22/2021, 11:00:37 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "places" (
"id" SERIAL,
    "user_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE INDEX "places.userId" ON "places"("user_id")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210522160037-create-places
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,25 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Place{
+  id Int @id @default(autoincrement())
+  userId String @map(name: "user_id")
+  image String
+  latitude Float
+  longitude Float
+  address String
+  createdAt DateTime @default(now())  @map(name: "created_at")
+  updatedAt DateTime @default(now())  @map(name: "updated_at")
+
+  @@index([userId], name: "places.userId")
+  @@map(name: "places")
+}
```


