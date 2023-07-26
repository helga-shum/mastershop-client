import httpService from "../httpService";
const productSliderEndpoint = "mainSlides/";

const ProductSliderService = {
  getAll: async () => {
    const { data } = await httpService.get(productSliderEndpoint);
    return data;
  },
};
export default ProductSliderService;
