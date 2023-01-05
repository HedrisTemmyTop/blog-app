import { useEffect, useState } from "react";
import { PostCard } from "../components/posts/allPost";
import { NavBar } from "../components/header/navBar";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-gap: 30px;
  align-item: center;
  width: 100%;
`;

const Cover = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  margin: 0 auto;
  align-item: center;
  height: 1px;
`;

export function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/blogs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data.posts);
      });
  }, []);
  return (
    <div>
      <NavBar />
      <Cover>
        <Container>
          {post.map((each) => (
            <PostCard
              key={each._id}
              title={each.title}
              owner={each.owner}
              id={each._id}
              read_count={each.read_count}
            />
          ))}
        </Container>
      </Cover>
    </div>
  );
}
