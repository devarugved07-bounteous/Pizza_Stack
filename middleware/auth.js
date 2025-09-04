export function validate(req, res, next) {
  const token = req.headers.authorization;

  if (!token || token !== process.env.TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
