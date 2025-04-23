alter table "public"."users" drop constraint "users_email_key";

drop index if exists "public"."users_email_key";

alter table "public"."users" drop column "full_name";

alter table "public"."users" add column "role" text default 'user'::text;

alter table "public"."users" alter column "email" drop not null;

alter table "public"."users" alter column "id" drop default;

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

create policy "Admins can view all user data"
on "public"."users"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users users_1
  WHERE ((users_1.id = auth.uid()) AND (users_1.role = 'admin'::text)))));


create policy "Users can view their own user data"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));



