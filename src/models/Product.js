const mongoose = require("mongoose");

// same as ReviewSchema but doesnt store the prodId
const MiniReviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true,
      required: "Username is required.",
      minlength: [3, "Username must be at least 3 characters long."],
      maxlength: [13, "Username can't exceed 13 characters."]
    },
    content: {
      type: String,
      required: "Review can't be empty.",
      maxlength: 255
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Product name is required.",
      maxlength: [90, "Product name is too long."],
      trim: true
    },
    description: {
      type: String,
      required: false,
      maxlength: 300
    },
    price_per_piece: {
      type: Number,
      required: "Price is required.",
      min: 1,
      trim: true
    },
    quantity_in_stock: {
      type: Number,
      required: "Quantity is required.",
      min: 0, // Ideally will only happen when a product runs out
      trim: true
    },
    category: {
      type: String,
      required: "Category is required.",
      enum: [
        "bookshelves",
        "coffee+tables",
        "cupboards",
        "dining+chairs",
        "dining+tables",
        "beds",
        "kitchen+cabinets",
        "lounge+chairs",
        "mattresses",
        "shoe+racks",
        "sofa+sets",
        "tv+units"
      ]
    },
    featured: {
      type: Boolean,
      default: false
    },
    img_url: {
      type: String,
      // it's actually required. Check the pre('save') hook
      required: false
    },
    reviews: {
      type: [MiniReviewSchema],
      required: false
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.index(
  { name: "text", category: "text" },
  { name: "search_index" }
);
ProductSchema.index(
  { category: 1, price_per_piece: 1 },
  { name: "get_category" }
);

ProductSchema.statics.calcTotal = function ({ productsInCart, productsInDb }) {
  const totalsArray = productsInCart.map(prodInCart => {
    const matchingPrice = productsInDb.find(
      prodInDb => String(prodInDb._id) === prodInCart._id
    ).price_per_piece;
    return matchingPrice * prodInCart.quantityInCart;
  });
  return totalsArray.reduce((total, totalPerProd) => total + totalPerProd);
};

ProductSchema.pre("save", function (next) {
  const product = this;
  if (product.isNew) {
    if (product.$isEmpty("img_url"))
      return next(product.invalidate("img_url", "Must supply an image"));
  }
  return next();
});

module.exports = mongoose.model("product", ProductSchema);
