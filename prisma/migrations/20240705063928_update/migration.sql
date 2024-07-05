-- DropIndex
DROP INDEX "user_username_idx";

-- CreateIndex
CREATE INDEX "user_username_password_idx" ON "user"("username", "password");
