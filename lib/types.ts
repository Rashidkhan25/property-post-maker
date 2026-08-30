export interface PropertyFormData {
  property: string;
  location: string;
  price: string;
  highlights: string;
  propertyImage: string | null;
}

export type PropertyFormField = Exclude<keyof PropertyFormData, "propertyImage">;

export const emptyFormData: PropertyFormData = {
  property: "",
  location: "",
  price: "",
  highlights: "",
  propertyImage: null,
};
