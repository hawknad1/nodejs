const logger = (req, res, next) => {
  const url = req.url;
  const method = req.method;
  const date = new Date().getFullYear();
  console.log(method, url, date);
  next();
};

module.exports = logger;
