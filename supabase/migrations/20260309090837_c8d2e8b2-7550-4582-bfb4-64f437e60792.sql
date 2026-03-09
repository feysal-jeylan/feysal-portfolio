-- Restrict admin CMS write access to owner email only
-- Keep existing public read policies for published content intact

DROP POLICY IF EXISTS "Authenticated users can select all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON public.blog_posts;

CREATE POLICY "Owner can select all blog posts"
ON public.blog_posts
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');

CREATE POLICY "Owner can insert blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');

CREATE POLICY "Owner can update blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');

CREATE POLICY "Owner can delete blog posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');

DROP POLICY IF EXISTS "Authenticated users can select all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON public.testimonials;

CREATE POLICY "Owner can select all testimonials"
ON public.testimonials
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');

CREATE POLICY "Owner can insert testimonials"
ON public.testimonials
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');

CREATE POLICY "Owner can update testimonials"
ON public.testimonials
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');

CREATE POLICY "Owner can delete testimonials"
ON public.testimonials
FOR DELETE
TO authenticated
USING ((auth.jwt() ->> 'email') = 'feysaljeylan67@gmail.com');