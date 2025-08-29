import z from "zod"

// Registration schema
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().optional(),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+2519\d{8}|09\d{8}|\+2547\d{8}|07\d{8})$/,
      "Invalid Ethiopian or Safaricom phone number"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string() // no validation; frontend dropdown handles it
});


export const validateRegister = (req, res, next) => {
  try {
    req.body = registerSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ success:false,errors: error.errors });
  }
};