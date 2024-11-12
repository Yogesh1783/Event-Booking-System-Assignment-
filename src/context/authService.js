
export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const storedUsers = JSON.parse(localStorage.getItem('users') || "[]");

      const user = storedUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        resolve({
          authToken: "mockAuthToken123",
          user: { name: user.name, email: user.email },
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
