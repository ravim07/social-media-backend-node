const errorHandler = (msg, statusCode) => {
  const defaultCode = 500;

  return res.status(defaultCode).send({
    message: msg,
  });
};

module.exports = { errorHandler };
