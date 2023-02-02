import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import customAjax from "../services/FetchService";
import { useLocalState } from "../util/useLocalStorage";

const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  function editReview(assignment) {
    window.location.href = `/assignments/${assignment.id}`;
  }

  function claimAssignment(assignment) {
    const decodedJwt = jwt_decode(jwt);
    const user = {
      username: decodedJwt.sub,
    };
    assignment.codeReviewer = user;
    // TODO: don't hardcode this status
    assignment.status = "In Review";
    customAjax(
      `/api/assignments/${assignment.id}`,
      "PUT",
      jwt,
      assignment
    ).then((updatedAssignment) => {
      //TODO: update the view for assignment that changed
      const assignmentsCopy = [...assignments];
      const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
      assignmentsCopy[i] = updatedAssignment;
      setAssignments(assignmentsCopy);
    });
  }

  useEffect(() => {
    customAjax("/api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, [jwt]);

  return (
    <Container>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="h1">Code Review Dashboard</div>
        </Col>
      </Row>
      <div className="assignment-wrapper in-review">
        <div className="h3 px-2 assignment-wrapper-title">In Review</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div
            className="d-grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill,16rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "16rem", height: "16rem" }}
                >
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <div className="d-flex align-items-center">
                      <Card.Title className="justify-content-start">
                        Assignment #{assignment.assignmentNum}
                      </Card.Title>
                      <Badge pill bg="info" className="fs-8 flex-shrink-1">
                        {assignment.status}
                      </Badge>
                    </div>

                    <Card.Text style={{ marginTop: "1em" }}>
                      <span>
                        <b>Github URL: </b>
                        {assignment.githubUrl}
                      </span>
                      <span>
                        <b>Branch: </b>
                        {assignment.branch}
                      </span>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        editReview(assignment);
                      }}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found</div>
        )}
      </div>

      <div className="assignment-wrapper submitted">
        <div className="h3 px-2 assignment-wrapper-title">Awaiting Review</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Submitted")
          .length > 0 ? (
          <div
            className="d-grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill,16rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Submitted")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "16rem", height: "16rem" }}
                >
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <div className="d-flex align-items-center">
                      <Card.Title className="justify-content-start">
                        Assignment #{assignment.assignmentNum}
                      </Card.Title>
                      <Badge pill bg="info" className="fs-8 flex-shrink-1">
                        {assignment.status}
                      </Badge>
                    </div>

                    <Card.Text style={{ marginTop: "1em" }}>
                      <span>
                        <b>Github URL: </b>
                        {assignment.githubUrl}
                      </span>
                      <span>
                        <b>Branch: </b>
                        {assignment.branch}
                      </span>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        claimAssignment(assignment);
                      }}
                    >
                      Claim
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found</div>
        )}
      </div>

      <div className="assignment-wrapper needs-update">
        <div className="h3 px-2 assignment-wrapper-title">Needs Update</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill,16rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "16rem", height: "16rem" }}
                >
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <div className="d-flex align-items-center">
                      <Card.Title className="justify-content-start">
                        Assignment #{assignment.assignmentNum}
                      </Card.Title>
                      <Badge pill bg="info" className="fs-8 flex-shrink-1">
                        {assignment.status}
                      </Badge>
                    </div>

                    <Card.Text style={{ marginTop: "1em" }}>
                      <span>
                        <b>Github URL: </b>
                        {assignment.githubUrl}
                      </span>
                      <span>
                        <b>Branch: </b>
                        {assignment.branch}
                      </span>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found</div>
        )}
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;
