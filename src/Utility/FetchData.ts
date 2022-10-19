import axios from "axios";
import { ApiTypes } from "../../types";

export async function getStolenBikeDetails() {
  const res = await axios.get<any>(
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=100&location=IP&distance=10&stolenness=stolen`
  );

  return res;
}
