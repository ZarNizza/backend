// npm start - starts nodemon
//
// POST, Add User, ok201/err400: curl --data '{"name":"abc","password":"xyz"}' -v localhost:8000/users
// GET, list of Users, ok200: curl -v localhost:8000/users
// request without /users, err404: curl localhost:8000
//
const http = require("http");
const users = [];

const handler = (req, res) => {
  switch (req.url) {
    case "/users":
      switch (req.method) {
        case "POST":
          let requestBody = "";
          req.on("data", (chunk) => {
            requestBody = requestBody + chunk;
          });
          req.on("end", () => {
            console.log("requestBody = ", requestBody);
            const parsedRequest = JSON.parse(requestBody);
            if (!parsedRequest.name) {
              res.writeHead(400, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(
                JSON.stringify({
                  code: 400,
                  message: "User Name is absent",
                })
              );
              return;
            }

            users.push(parsedRequest.name);
            res.writeHead(201, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(
              JSON.stringify({
                id: users.length - 1,
              })
            );
          });

          break;

        case "GET":
          res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(
            JSON.stringify({
              users: users,
            })
          );
          break;
      }
      break;

    default:
      res.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(
        JSON.stringify({
          data: "Url Not Found!",
        })
      );
  }
};

// Create a local server to receive data from
const server0 = http.createServer(handler);
server0.listen(8000);
