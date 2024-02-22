import Listing from "../Models/ListingModel.js";

export const createListing = async (req, res, next) => {
    console.log(req.user);
    console.log(req.body);
    try
    {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);

    } catch (error) {
        next(error);
    }
}