async function signupController(req, res, next) {
  try {
    console.log("BODY:", req.body);

    const user = await authService.signup(req.body);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
router.post("/signup", (req, res, next) => {
  console.log("SIGNUP ROUTE HIT");
  next();
}, signupController);