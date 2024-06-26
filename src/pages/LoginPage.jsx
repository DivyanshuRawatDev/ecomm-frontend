import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError } = useSelector(
    (store) => store.user
  );
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   dispatch(fetchLogin({ email, password }));
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password })).then((action) => {
      if (action.payload?.userData) {
        navigate("/");
        toast.success(action?.payload?.message);
      }
    });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
    >
      <Heading as="h2" mb={6}>
        Log In
      </Heading>
      <form onSubmit={handleLogin}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Log In
          </Button>
        </Stack>
      </form>
      <Box mt={4}>
        Don't have an account?{" "}
        <Button
          as={RouterLink}
          to="/signup"
          colorScheme="teal"
          variant="link"
          size="sm"
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
