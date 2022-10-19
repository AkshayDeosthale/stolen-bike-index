import axios from "axios";
import { ApiTypes } from "../../types";

export async function getStolenBikeDetails(page: string, rows: string) {
  const res = await axios.get<any>(
    `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=${rows}&location=IP&distance=10&stolenness=stolen`
  );

  return res;
}
