import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import customAjax from "../services/FetchService";
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    customAjax("/api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, [jwt]);

  function createAssignment() {
    customAjax("api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `/assignments/${assignment.id}`;
    });
  }

  return (
    <div style={{ margin: "2em" }}>
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
      <div className="mb-5">
        <Button size="lg" onClick={() => createAssignment()}>
          Submit New Assignment
        </Button>
      </div>
      {assignments ? (
        <div
          className="d-grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill,16rem)" }}
        >
          {assignments.map((assignment) => (
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
                  <Badge
                    pill
                    bg={assignment.status === "Completed" ? "success" : "info"}
                    className="fs-8 flex-shrink-1"
                  >
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
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
