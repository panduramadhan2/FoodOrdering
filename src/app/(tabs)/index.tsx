import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { View } from "react-native";

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[9]} />
      <ProductListItem product={products[1]} />
    </View>
  );
}