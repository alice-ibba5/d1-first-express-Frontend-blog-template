import React, { useCallback, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
//import { toast } from "react-toastify";

const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [idAuthor, setIdAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [createdAt, setcreatedAt] = useState("");

  const handleChange = useCallback((value) => {
    setText(value);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      category: category,
      title: title,
      content: text,
      readTime: {
        value: readTime,
      },
      author: {
        _id: idAuthor,
      },
      createdAt: createdAt,
    };

    try {
      fetch("http://localhost:3000/api/blogPosts", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
        // cover,
      })
        .then(function (response) {
          if (response.ok) {
            //toast.success("Comment saved successfully!", {
            // position: toast.POSITION.BOTTOM_RIGHT,
            //});
          } else {
            // toast.error("Something went wrong!", {
            //   position: toast.POSITION.TOP_LEFT,
            // });
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })

        .then(setBlog(formData))
        .finally(() => {
          setLoading(false);
        });
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
            onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>ID Authors</Form.Label>
          <Form.Control
            size="lg"
            placeholder="2348762397429"
            required
            value={idAuthor}
            onChange={(e) => setIdAuthor(e.target.value)}
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

        <Form.Group className="mt-3">
          <Form.Label>Tempo di lettura</Form.Label>
          <Form.Control
            size="lg"
            placeholder="3 minuti"
            required
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
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
