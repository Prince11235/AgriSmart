import { FarmerProfile } from '../models/FarmerProfile.js';
import { User } from '../models/User.js';

export const getFarmerProfile = async (req, res, next) => {
  try {
    let profile = await FarmerProfile.findOne({ userId: req.user._id || req.user.id });
    const user = await User.findById(req.user._id || req.user.id).select('-password');

    if (!profile && user) {
      profile = await FarmerProfile.create({ userId: user._id });
    }

    res.json({
      success: true,
      data: {
        ...profile.toObject(),
        location: user?.location,
        name: user?.name,
        profilePicture: user?.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const upsertFarmerProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { location, primaryCrops, ...rest } = req.body;

    if (location) {
      const place = [location.village, location.district, location.state].filter(Boolean).join(', ');
      let resolvedLocation = location;
      if (place) {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(place)}`, {
            headers: { 'User-Agent': 'AgriSmart/1.0 (farm-profile-geocoding)' }
          });
          const matches = await response.json();
          if (matches[0]) {
            resolvedLocation = { ...location, lat: Number(matches[0].lat), lng: Number(matches[0].lon) };
          }
        } catch (geocodeError) {
          console.warn('Farm location could not be geocoded; retaining saved coordinates.', geocodeError.message);
        }
      }
      await User.findByIdAndUpdate(userId, { location: resolvedLocation });
    }

    const profile = await FarmerProfile.findOneAndUpdate(
      { userId },
      { ...rest, primaryCrops, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};
