import axios from "axios";
import { Bike, BikeAPIResponse, CountType } from "../../types";

export const getStolenBikeDetails = async (page: number) => {
  try {
    const res = await axios.get<BikeAPIResponse>(
      `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=10&location=sydney&distance=10&stolenness=stolen&access_token=location`
    );

    return res.data.bikes as Bike[];
  } catch (error) {
    console.error(error);
  }
};

export const getStolenBikeCount = async () => {
  try {
    const res = await axios.get<CountType>(
      `https://bikeindex.org:443/api/v3/search/count?location=sydney&distance=10&stolenness=stolen&access_token=location`
    );

    console.log(res.data.stolen);
  } catch (error) {
    console.error(error);
  }
};
