const { userRegister, userLogin , userAuth, verifyEmail} = require("../utils/Auth");
const { verifyOtp } = require("../utils/otpMobile");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - number
 *          - username
 *          - password
 *        properties:
 *                name:
 *                    type: String
 *                email:
 *                     type: String
 *                number:
 *                     type: String
 *                isAdmin: 
 *                     type: Boolean
 *                username:
 *                     type: String
 *                password:
 *                     type: String
 *                confirmed: 
 *                     type: Boolean
 *
 */

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: The User managing API
 */


/**
 * @swagger
 * /api/users/register:
 *  post:
 *    summary: Signup
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The User was successfully registered. Check your mail.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Username / Email is already Taken
 *      500:
 *        description: The User was not created
 *
 *
 */

//  Registration route
router.post("/register", async (req, res) => {
  await userRegister(req.body, res);
});


/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Login
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User is successfully Logged in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      403:
 *        description: Incorrect Password
 *      404:
 *        description: Username is not found / Please confirm your email to login.
 *
 *
 */

// Owner Login route
router.post("/login", async (req, res) => {
  await userLogin(req.body, res);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       required:
 *         - userId
 *         - token
 *       properties:
 *         userId:
 *           type: string
 *         token:
 *           type: string
 *
 * @swagger
 * tags:
 *   name: Verifications
 *   description: User verification API
 *
 * @swagger
 * /api/users/verify/{id}/{token}:
 *   get:
 *     summary: Verify user email
 *     tags: [Verifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to verify their email
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The verification token to use
 *     responses:
 *       '200':
 *         description: User email verified successfully
 *       '400':
 *         description: Invalid token or user ID provided
 *       '500':
 *         description: An internal server error occurred
 */



router.get("/verify/:id/:token",async(req,res)=>{
 await verifyEmail(req,res)
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Otp:
 *       type: object
 *       required:
 *         - number
 *         - otp
 *       properties:
 *         number:
 *           type: string
 *         otp:
 *           type: string
 *
 * @swagger
 * /api/users/verify/otp:
 *   post:
 *     summary: Verify User Number 
 *     tags: [Verifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Otp'
 *     responses:
 *       '200':
 *         description: Otp verification Successful
 *       '400':
 *         description: You are using an Expired OTP!
 *       '500':
 *         description: An internal server error occurred
 */

router.post('/verify/otp',async(req,res)=>{
  await verifyOtp(req.body.otp,req.body.number,req,res)
 })

module.exports = router;
