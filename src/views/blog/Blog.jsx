import React, { useEffect, useState } from "react";
import { Container, Image, Spinner, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";

const Blog = (props) => {

  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/blogposts/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const getComments = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/blogposts/${id}/comments`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return loading ? (
    <div className="d-flex mt-5">
      <Spinner animation="border" variant="primary" className="mx-auto" />
    </div>
  ) : (
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
            <div>{`lettura da ${blog.value} ${blog.unit}`}</div>
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
        <h4 className="mt-3">Comments:</h4>
        {comments.map((comment) =>
          <Col>
            <h5 className="mt-2">User:</h5>
            <span>{`${comment.user}`}</span>
            <h5 className="mt-2">Comment:</h5>
            <span>{`${comment.text}`}</span>

          </Col>
        )}
      </Container>
    </div>
  )
};

export default Blog;
