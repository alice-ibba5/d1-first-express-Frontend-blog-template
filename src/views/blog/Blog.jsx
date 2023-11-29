import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";

import "./styles.css";

const Blog = props => {
  const [blog, setBlog] = useState({});
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        let response = await fetch(
          "http://localhost:3000/api/blogposts",

        );
        console.log(response);
        if (response.ok) {
          let blogPost = await response.json();
          setPosts(blogPost);
          setLoading(false);

        } else {
          console.log("error");
          setLoading(false);

        }
      } catch (error) {
        console.log(error);
        setLoading(false);

      }
    };
    if (!posts) {
      getPosts();
    }
  }, [posts]);

  useEffect(() => {
    const { id } = params;
    const blog = posts.find(posts => posts._id.toString() === id);

    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
