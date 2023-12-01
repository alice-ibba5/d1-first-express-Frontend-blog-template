import React, { useCallback, useState, useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
//import { ToastContainer, toast } from 'react-toastify'

const NewBlogPost = ({ blogPosts, setblogPosts }) => {
  const [text, setText] = useState("");
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [cover, setCover] = useState("");


  const handleChange = useCallback((value) => {
    setText(value);
    console.log(value)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      readTime: {
        value: readTime,
      },
      author: author,
      category: category,
      title: title,
      cover: cover,
      content: text,
    };

    try {
      let response = await fetch("http://localhost:3000/api/blogposts", {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "POST",
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setBlog(formData)
        alert("Blogpost created successfully!")

      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };



  return loading ? (
    <div className="d-flex mt-5">
      <Spinner animation="border" variant="primary" className="mx-auto" />
    </div>
  ) : (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author ID</Form.Label>
          <Form.Control
            size="lg"
            placeholder="2348762397429"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}

          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Link to the cover image"
            required
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Tempo di lettura</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              size="lg"
              placeholder="3"
              required
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              style={{
                width: 50,
              }}
            />
            <span className="ms-2">minuti</span>
          </div>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button
            type="reset"
            size="lg"
            variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>

    </Container>
  );
};

export default NewBlogPost;
