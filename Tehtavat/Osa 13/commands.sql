CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Test author', 'new.blog.com', 'my awesome blog');
INSERT INTO blogs (url, title) VALUES ('New author', 'New authors great new blog');