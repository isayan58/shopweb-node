const userController = require("../Controllers/userController");

const routes = {
    userRoutes: (app) => {
        app.post("/postUsers", userController.postUsers);
        app.get("/users", userController.getUsers);
        app.put("/users/:id", userController.updateUserById);
        app.delete("/deleteUser/:id", userController.deleteUserById);
        app.post("/authenticateUser", userController.authenticateUser);
    },
};

module.exports = routes;