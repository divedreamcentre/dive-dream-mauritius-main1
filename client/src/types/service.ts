export interface Service {
  id: string;
  title: string;
  description: string;
  /** Feature bullets shown on the service's detail page. */
  highlights?: string[];
  price: string;
  image: string;
}
