import { register } from "../../controllers/authController.js";

const req = {
	body: {
		name: "fake_email",
		password: "fake_email",
	},
};
it("should end a status code of 400 when user exists", async () => {
	await register(req);
});
