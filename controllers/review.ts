import { db } from "../utils/dbServer";
import { Review } from "../types/review";
// ngambil semua review

export const getReviewsByPlanetariumId = async (
  planetariumId: number
): Promise<Review[]> => {
  const review: Review[] = await db.review.findMany({
    select: {
      reviewId: true,
      rating: true,
      komentar: true,
      nama: true,
    },
    where: {
      planetariumId: planetariumId,
    },
  });

  return review;
};
