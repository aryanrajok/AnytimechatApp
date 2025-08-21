import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const {
    loginUser,
    loginInfo,
    loginError,
    isLoginLoding, 
    updateLoginInfo,
  } = useContext(AuthContext);

  return (
    <Form onSubmit={loginUser}>
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
            <h2>Login</h2>

            <Form.Control
              type="email"
              placeholder="Email"
              value={loginInfo.email}
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />

            <Form.Control
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />

            <Button variant="primary" type="submit" disabled={isLoginLoding}>
              {isLoginLoding ? "Logging in..." : "Login"}
            </Button>

            {/* Show error if exists */}
            {loginError?.error && (
              <Alert variant="danger">
                <p>{loginError.message}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
