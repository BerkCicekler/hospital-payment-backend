import { InstitutionRepository } from "../repository/institutionRepository.js";

const repo = new InstitutionRepository();

export class InstitutionService {

  async getNearby(lat, lng, km = 5) {

    if (!lat || !lng || !km) {
      throw new Error("lat, lng and km are required");
    }

    return repo.findWithinRadius(
      Number(lat),
      Number(lng),
      Number(km)
    );
  }

  async search(search, limit = 10) {

    if (!search) {
      throw new Error("search is required");
    }

    return repo.searchByName(
      search,
      limit ? Number(limit) : 10
    );
  }
}