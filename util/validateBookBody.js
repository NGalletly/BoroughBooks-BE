exports.validateBookBody = (req, res, next) => {
  const { isbn, title, authors, publisher, published_date } = req.body;
  const errors = [];

  if (!isbn || !title || !authors || !publisher || !published_date) {
    errors.push(
      "Missing required fields: isbn, title, authors, publisher or published_date.",
    );
  }

  if (isbn && isbn.length < 9) {
    errors.push("ISBN must be at least 10 characters.");
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    error.status = 400;
    return next(error);
  }

  next();
};
