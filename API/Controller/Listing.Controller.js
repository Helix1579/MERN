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

export const deleteListing = async (req, res, next) => {
    if (!(await Listing.findById(req.params.id))) {
        return res.status(404).json("Listing not found");
    }
    try
    {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted");

    } catch (error) {
        next(error);
    }
}