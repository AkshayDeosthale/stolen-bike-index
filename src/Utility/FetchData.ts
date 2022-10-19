import axios from "axios";
import { ApiTypes } from "../../types";

export function getStolenBikeDetails(page: string, rows: string) {
  axios
    .get<ApiTypes.ApiResponseType>(
      `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=${rows}&location=IP&distance=10&stolenness=stolen`
    )
    .then((res) => console.log(res))
    .catch((err) => console.error({ err }));
}
