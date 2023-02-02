import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import customAjax from "../services/FetchService";
import { useLocalState } from "../util/useLocalStorage";

const CodeReviewerAssignmentView = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
    assignmentNum: null,
    status: null,
  });

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const prevAssignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save(status) {
    if (status && assignment.status !== status)
      updateAssignment("status", status);
    else {
      persist();
    }
  }
  function persist() {
    customAjax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  useEffect(() => {
    if (prevAssignmentValue.current.status !== assignment.status) {
      persist();
    }
    prevAssignmentValue.current = assignment;
  }, [assignment]);

  useEffect(() => {
    customAjax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignment.branch === null) assignment.branch = "";
        if (assignment.githubUrl === null) assignment.githubUrl = "";

        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        setAssignmentStatuses(assignmentResponse.statusEnums);
      }
    );
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.assignmentNum ? (
            <h1>Assignment {assignment.assignmentNum} </h1>
          ) : (
            <></>
          )}
        </Col>

        <Col>
          <Badge pill bg="info" className="fs-6">
            {assignment.status}
          </Badge>
        </Col>
      </Row>
      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="githubUrl">
            <Form.Label column sm="3" md="2" className="fs-4">
              Github URL
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                value={assignment.githubUrl}
                type="url"
                readOnly
                placeholder="https://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2" className="fs-4">
              Branch
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
                type="text"
                readOnly
                placeholder="Name of the branch"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githubUrl">
            <Form.Label column sm="3" md="2" className="fs-4">
              Video Review URL
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) =>
                  updateAssignment("codeReviewVideoUrl", e.target.value)
                }
                value={assignment.codeReviewVideoUrl}
                type="url"
                placeholder="https://screencast-o-matic.com/something"
              />
            </Col>
          </Form.Group>
          <Row>
            {assignment.status === "Completed" ? (
              <Col>
                <Button
                  size="lg"
                  variant="warning"
                  onClick={() => save(assignmentStatuses[2].status)}
                >
                  Re-Claim!
                </Button>
              </Col>
            ) : (
              <Col>
                <Button
                  size="lg"
                  onClick={() => save(assignmentStatuses[4].status)}
                >
                  Complete Review!
                </Button>
              </Col>
            )}
            {assignment.status === "Needs Update" ? (
              <Col>
                <Button
                  size="lg"
                  variant="warning"
                  onClick={() => save(assignmentStatuses[2].status)}
                >
                  Re-claim!
                </Button>
              </Col>
            ) : (
              <Col>
                <Button
                  size="lg"
                  variant="danger"
                  onClick={() => save(assignmentStatuses[3].status)}
                >
                  Reject Assignment!
                </Button>
              </Col>
            )}

            <Col>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Back
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewerAssignmentView;
