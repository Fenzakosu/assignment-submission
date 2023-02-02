import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import customAjax from "../services/FetchService";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
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

  function save() {
    // this implies that the student is submitting the assignment for the
    // first time
    if (assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status", assignmentStatuses[1].status);
    } else {
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
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2" className="fs-4">
              Assignment Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant={"info"}
                title={
                  assignment.assignmentNum
                    ? `Assignment ${assignment.assignmentNum}`
                    : "Select Assignment"
                }
                onSelect={(selected) => {
                  updateAssignment("assignmentNum", selected);
                }}
              >
                {assignmentEnums.map((assignmentEnum) => {
                  return (
                    <Dropdown.Item
                      key={assignmentEnum.assignmentNum}
                      eventKey={assignmentEnum.assignmentNum}
                    >
                      {assignmentEnum.assignmentNum}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="my-3" controlId="githubUrl">
            <Form.Label column sm="3" md="2" className="fs-4">
              Github URL
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                value={assignment.githubUrl}
                type="url"
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
                placeholder="Name of the branch"
              />
            </Col>
          </Form.Group>

          {assignment.status === "Completed" ? (
            <>
              <Form.Group
                as={Row}
                className="mb-3 d-flex align-items-center"
                controlId="codeReviewVideoUrl"
              >
                <Form.Label column sm="3" md="2" className="fs-4">
                  Code Review Video URL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <a
                    href={assignment.codeReviewVideoUrl}
                    className="d-flex align-items-center justify-content-center fw-bold"
                  >
                    {assignment.codeReviewVideoUrl}
                  </a>
                </Col>
              </Form.Group>
              <div>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Back
                </Button>
              </div>
            </>
          ) : (
            <Row>
              <Col>
                <Button size="lg" onClick={() => save()}>
                  Submit Assignment!
                </Button>
              </Col>

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
          )}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;
