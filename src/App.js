import React, { useState } from "react";
import "./App.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Character";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const handleGeneratePassword = () => {
    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("To generate password you must select atleast one checkbox", true);
    } else {
      let pwdList = "";
      if (includeNumbers) {
        pwdList = pwdList + numbers;
      }
      if (includeUpperCase) {
        pwdList = pwdList + upperCaseLetters;
      }
      if (includeLowerCase) {
        pwdList = pwdList + lowerCaseLetters;
      }
      if (includeSymbols) {
        pwdList = pwdList + specialCharacters;
      }
      setPassword(createPassword(pwdList));
      notify("Password generated successfully", false);
    }
  };
  const createPassword = (pwdList) => {
    let password = "";
    const characterListLength = pwdList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + pwdList.charAt(characterIndex);
    }
    return password;
  };
  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success (message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify("Failed to copy the password", true);
    } else {
      copyToClipboard(password);
      notify("Password copied to the clipboard successfully");
    }
  };

  return (
    <Container fluid className="">
      <div className="App ">
        <Card style={{ width: "18rem" }} className="shadow-sm py-4 px-2 bg-grey">
          <h4 className="text-primary fw-bold  text-center">Password Generator</h4>

          <InputGroup className="mb-3 p-0">
            <Form.Control
              placeholder="Password"
              aria-describedby="basic-addon2"
              size="sm"
              value={password}
            />
            <InputGroup.Text id="basic-addon2" >
              {" "}
              <i
                class="fa-regular fa-clipboard"
                onClick={handleCopyPassword}
              ></i>
            </InputGroup.Text>
          </InputGroup>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="9">
              Password Length
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="number"
                defaultValue={passwordLength}
                size="sm"
                className="float-end mt-1"
                onChange={(e) => setPasswordLength(e.target.value)}
                id="password-stregth"
                name="password-strength"
                max="26"
                min="8"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="8">
              Include Uppercase
            </Form.Label>
            <Col sm="4">
              <Form.Check // prettier-ignore
                type="switch"
                className="float-start float-md-end mt-2"
                checked={includeUpperCase}
                onChange={(e) => setIncludeUpperCase(e.target.checked)}
                id="uppercase-letters"
                name="uppercase-letters"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="8">
              Include Lowercase
            </Form.Label>
            <Col sm="4">
              <Form.Check // prettier-ignore
                type="switch"
                className="float-end mt-2"
                checked={includeLowerCase}
                onChange={(e) => setIncludeLowerCase(e.target.checked)}
                id="lowercase-letters"
                name="lowercase-letters"
                // label="Check this switch"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="8">
              Include Numbers
            </Form.Label>
            <Col sm="4">
              <Form.Check // prettier-ignore
                type="switch"
                className="float-end mt-2"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                id="include-numbers"
                name="include-numbers"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="8">
              Include Symbols
            </Form.Label>
            <Col sm="4">
              <Form.Check // prettier-ignore
                type="switch"
                className="float-end mt-2"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                id="include-symbols"
                name="include-symbols"
              />
            </Col>
          </Form.Group>
          <Button variant="primary" onClick={handleGeneratePassword}>
            Generate Password
          </Button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Card>
      </div>
    </Container>
  );
};

export default App;
