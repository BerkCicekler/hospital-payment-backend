import { prisma } from "../config/db.js";

export class InstitutionRepository {

  // 1️⃣ KM bazlı konum araması
  async findWithinRadius(lat, lng, km = 30) {
      return prisma.$queryRaw`
    SELECT 
      name,
      ST_Y(location::geometry) as lat,
      ST_X(location::geometry) as lng
    FROM "Institution"
    WHERE ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
      ${km} * 1000
    );
  `;
}

  // 2️⃣ Name search
  async searchByName(search, limit = 10) {
    return prisma.$queryRaw`
      SELECT
        id,
        name,
        ST_Y(location::geometry) as lat,
        ST_X(location::geometry) as lng
      FROM "Institution"
      WHERE name ILIKE ${"%" + search + "%"}
      LIMIT ${limit};
    `;
  }
}