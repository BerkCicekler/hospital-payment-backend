import { InstitutionService } from "../services/institutionService.js";

const service = new InstitutionService();

// 1️⃣ Nearby
export const getNearbyInstitutions = async (req, res) => {
  try {
    const { lat, lng} = req.query;

    const data = await service.getNearby(lat, lng);

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 2️⃣ Name Search
export const searchInstitutions = async (req, res) => {
  try {
    const { search } = req.query;

    if (search.length < 4) {
        return res.status(400).json({ message: 'Search text must be longer than 3 letters' });
    }

    const data = await service.search(search);

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};