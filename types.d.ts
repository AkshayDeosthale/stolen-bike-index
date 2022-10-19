export declare namespace ApiTypes {
  interface ApiResponseType {
    data: {
      bikes: BikesInterface[];
    };
  }
  interface BikesInterface {
    date_stolen: number;
    description: string;
    stolen_location: string;
    title: string;
    large_img: string;
    id: number;
  }
}
