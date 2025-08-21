import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoding,
  } = useContext(AuthContext);

  return (
    <Form onSubmit={registerUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10%",
        }}
        className="align-items-start"
      >
        <Col xs={10} md={6} lg={4}>
          <Stack gap={3}>
            <h2>Register</h2>

            <Form.Control
              type="text"
              placeholder="Name"
              value={registerInfo.name}
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  name: e.target.value,
                })
              }
            />

            <Form.Control
              type="email"
              placeholder="Email"
              value={registerInfo.email}
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  email: e.target.value,
                })
              }
            />

            <Form.Control
              type="password"
              placeholder="Password"
              value={registerInfo.password}
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                })
              }
            />

            <Button variant="primary" type="submit" disabled={isRegisterLoding}>
              {isRegisterLoding ? "Creating your account..." : "Register"}
            </Button>

            {/* Show error if exists */}
            {registerError?.error && (
              <Alert variant="danger">
                <p>{registerError.message}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
