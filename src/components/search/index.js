import React, { useState, useEffect } from "react";
import RepoTimeline from "../timeline/";
import styled from "styled-components";
import {
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import getUserRepositories from "../../api/";
import Link from 'next/link'


function Search() {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState();
  const [apiLimitError, setApiLimitError] = useState("");

  const enterPressed = (event) => {
    setApiLimitError("");

    let code = event.keyCode || event.which;

    if (code === 13 || event.button == 0) {
      if (username) {
        async function getRepositories() {
          let repositoriesResponse = await getUserRepositories(username);

          !repositoriesResponse.message
            ? setRepositories(repositoriesResponse)
            : setApiLimitError(repositoriesResponse.message);
        }
        getRepositories();
      } else setRepositories(undefined);
    }
  };

  const styledInput = (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Username"
        aria-label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        onKeyPress={enterPressed.bind(this)}
      />
      <Button
        type="button"
        onClick={enterPressed.bind(this)}
        className="search-button"
      >
        Search
      </Button>
    </InputGroup>
  );

  return (
    <>
      <Container style={{ marginTop: "80px" }}>
        <Row>
          <Col>
            <h2>Github Repository Timeline</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <a
                target="_blank"
                href="https://github.com/okandavut/git-repositories-timeline"
              >
                Check on Github
              </a>
            </p>
            <br />
          </Col>
        </Row>
        <Row>
          <Col>{styledInput}</Col>
        </Row>
        <Row style={{display: repositories ? 'block' : 'none' }}
>
          <Col>
            <Link href={"/" + username}>
              <a target="_blank">Get your personal Link</a>
            </Link>
          </Col>
        </Row>
      </Container>

      <RepoTimeline repositories={repositories} apiLimitError={apiLimitError} />
    </>
  );
}

export default Search;
