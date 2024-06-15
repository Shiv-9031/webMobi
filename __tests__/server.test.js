import axios from "axios";

const url = "http://localhost:4000/api/v1/user";
let token = "";

describe("The router", () => {
  test("The registration route of user", async () => {
    const res = await axios.post(`${url}/registration`, {
      email: "hhh@gmail.com",
      password: "1234",
      name: "hhh",
    });
    expect(res.status).toBe(200);
    expect(res.data.message).toBe("user created");
  }, 8000);

  test("The login route with the user", async () => {
    const res = await axios.post(`${url}/login`, {
      email: "hhh@gmail.com",
      password: "1234",
    });

    token = res.data.token;

    expect(res.status).toBe(200);
    expect(res.data.message).toBe("welcome hhh");
  });

  test("The Get profile api", async () => {
    let res = await axios.get(`${url}/profile`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });

    expect(res.status).toBe(200);
    expect(res.data.user.name).toBe("hhh");
  });
});

test("The registration route of user", async () => {
  const res = await axios.post(`${url}/registration`, {
    email: "hhk@gmail.com",
    password: "1234",
    name: "hhhooo",
  });
  if (res) {
    console.log(res.data.message);
    expect(res.status).toBe(200);
    expect(res.data.message).toBe("user created");
  }
}, 8000);

test("The login route with the user", async () => {
  const res = await axios.post(`${url}/login`, {
    email: "hhk@gmail.com",
    password: "1234",
  });

  token = res.data.token;

  expect(res.status).toBe(200);
  expect(res.data.message).toBe("welcome hhhooo");
});

test("The Get profile api", async () => {
  let res = await axios.get(`${url}/profile`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  expect(res.status).toBe(200);
  expect(res.data.user.name).toBe("hhhooo");
});
