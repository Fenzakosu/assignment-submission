import React, { useEffect, useState } from "react";
import customAjax from "../services/FetchService";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
  });
  const [jwt, setJwt] = useLocalState("", "jwt");

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save() {
    customAjax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  useEffect(() => {
    customAjax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }, []);

  return (
    <div>
      <h1>Assignment ID : {assignmentId}</h1>
      {assignment ? (
        <>
          <h1> Status : {assignment.status}</h1>
          <h3>
            Github URL :{" "}
            <input
              type="url"
              id="githubUrl"
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              value={assignment.githubUrl}
            />
          </h3>
          <h3>
            Branch :{" "}
            <input
              type="text"
              id="branch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch}
            />
          </h3>
          <button onClick={() => save()}>Submit Assignment!</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;
