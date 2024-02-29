import Listing from "../Models/ListingModel.js";

export const createListing = async (req, res, next) => {
    // console.log(req.user);
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

export const updateListing = async (req, res, next) => {
    if (!(await Listing.findById(req.params.id))) {
        return res.status(404).json("Listing not found");
    }
    try
    {
        const listing = await Listing.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(listing);

    } catch (error) {
        next(error);
    }
}

export const getListing = async (req, res, next) => {
    if (!(await Listing.findById(req.params.id))) {
        return res.status(404).json("Listing not found");
    }
    try
    {
        const listing = await Listing.findById(req.params.id);
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) => {
    console.log(req.query);

    try
    {
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }
        
        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const search = req.query.search || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: search, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
        
        res.status(200).json(listings);
        
    } catch (error) {
        next(error);
    }
}