import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, " Listing not found!"));
  }

  //check if the user is the owner of the listing or not
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }
  //once everything is ok, delete the listing
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted sucessfully!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  //check if listing exsist or not
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHanding(404, "Listing not found!"));
  }
  //check if listing belongs to the person
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own Listings!"));
  }
  //now apply try-catch statement
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  //try catch
  try {
    //add limit,
    const limit = parseInt(req.query.limit) || 9;
    // start index
    const startIndex = parseInt(req.query.startIndex) || 0;
    //other offers - it can be true, false or undefined, condtion if apply here
    let offer = req.query.offer;
    //check and search into the db
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    //similary with furnished and other stuffs
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    //searchTerm
    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    //now we wanna get the listing
    const listing = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    }).sort({
      [sort]: order,
    }).limit(limit).skip(startIndex);

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
