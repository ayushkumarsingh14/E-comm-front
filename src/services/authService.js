export const loginUser = async (username, password) => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const token = await response.text(); // ✅ backend is returning plain string
  return token;
};


export const registerUser = async (username, password) => {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return await response.text(); // ✅ backend is returning plain string
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
