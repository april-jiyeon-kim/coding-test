type ProductType = {
  type: string;
  id: number;
  kind: number;
  productType: number;
  imagePath: string;
  representativeImageUrl: string;
  price: number;
  krPrice: string;
  localPrice: string;
  viewed: number;
  currency: string;
  localCurrency: string;
  categoryId: number;
  categoryName: string;
  tourType: number;
  buyingType: number;
  sanitaries: string;
  score: string;
  reviewTotal: number;
  day: number;
  duration: number;
  ratings: number;
  title: string;
  data: string;
  mobilityType: number;
  productConfirmType: number;
  confirmPeriod: number;
  tourTime: string;
  displayPrice: string;
  displayLocalPrice: string;
  koreanWonPrice: string;
  discount: object;
  promotionVideoUrl: string;
  promotionVideoThumbnailUrl: object;
  confirmType: string;
  origin: string;
  dest: string;
  seller: object;
};

type OptionType = {
  key: string;
  text: string;
};

interface APIResponse {
  status: number;
  success: boolean;
  data: ProductType[];
}
