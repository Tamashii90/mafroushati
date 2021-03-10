const Review = require("../models/Review");
const Product = require("../models/Product");

exports.get_featured = async (req, res) => {
  try {
    const featuredReviews = await Review.find(
      { featured: true },
      { "prodId": 1, "content": 1, "user": 1 },
      {
        limit: 6,
        lean: true,
        populate: {
          path: "prodId",
          select: "name"
        }
      }
    );
    res.send(featuredReviews);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.post_review = async (req, res) => {
  // Grabbing user from session so that each user can only
  // write a review using their real identity
  const incomingReview = { ...req.body, user: req.user.username };
  try {
    const product = await Product.findById(req.body.prodId);
    if (!product)
      return res.status(404).send({ error: true, message: "Product doesn't exist." });

    // Use a transaction to update both Products and Reviews collections
    const transacSession = await Review.db.startSession();
    const newReview = new Review(incomingReview);
    product.reviews.push(newReview); // use the _id from above
    await transacSession.withTransaction(() => {
      const writeToReviews = newReview.save({ session: transacSession });
      const writeToProducts = product.save({ session: transacSession });
      return Promise.all([writeToReviews, writeToProducts]);
    });
    res.status(201).send({ error: false, message: "Review added." });
    transacSession.endSession();
  } catch (err) {
    if (err.errors) {
      return res
        .status(400)
        .send({ error: true, message: err._message, body: err.errors });
    }
    return res.status(500).send({ error: true, message: "Server error." });
  }
};

exports.patch_review = async (req, res) => {
  try {
    // User can only edit his own reviews. Admins can edit everyone's.
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(400).send({ error: true, message: "No review." });
    if (review.featured) return res.status(403).send({ error: true, message: "Can't edit a featured review." });
    if (!req.user.admin && review.user !== req.user.username)
      return res.status(403).send({ error: true, message: "Unauthorized !" });

    // Use a transaction to update both Products and Reviews collections
    const transacSession = await Review.db.startSession();
    const product = await Product.findById(review.prodId);
    const reviewIdx = product.reviews.findIndex(
      (reviewInProd) => reviewInProd.user === review.user
    );
    Object.assign(product.reviews[reviewIdx], req.body);
    Object.assign(review, req.body);
    await transacSession.withTransaction(() => {
      const writeToReviews = review.save({ session: transacSession });
      const writeToProducts = product.save({ session: transacSession });
      return Promise.all([writeToReviews, writeToProducts]);
    });
    res.status(200).send({ error: false, message: "Edited successfully." });
    transacSession.endSession();
  } catch (err) {
    if (err.errors) {
      return res
        .status(400)
        .send({ error: true, message: err._message, body: err.errors });
    }
    return res.status(500).send();
  }
};

exports.delete_review = async (req, res) => {
  try {
    // User can only delete his own reviews. Admins can delete everyone's.
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(400).send({ error: true, message: "No review." });
    if (!req.user.admin && review.user !== req.user.username)
      return res.status(403).send({ error: true, message: "Unauthorized !" });

    // Use a transaction to update both Products and Reviews collections
    const transacSession = await Review.db.startSession();
    const product = await Product.findById(review.prodId);
    const reviewIdx = product.reviews.findIndex(
      (reviewInProd) => reviewInProd.user === review.user
    );
    product.reviews[reviewIdx].remove(); // subdoc.remove() is different from doc.remove()
    await transacSession.withTransaction(() => {
      const writeToReviews = review.remove({ session: transacSession });
      const writeToProducts = product.save({ session: transacSession });
      return Promise.all([writeToReviews, writeToProducts]);
    });
    res.status(200).send({ error: false, message: "Review deleted." });
    transacSession.endSession();
  } catch (err) {
    res.status(500).send();
  }
};
