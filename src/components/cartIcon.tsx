import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

function CartIcon({ count }) {
  return (
    <div className="relative">
      <Button variant="ghost" className="p-2" size={undefined}>
        <ShoppingCart className="w-6 h-6" />
      </Button>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

export default CartIcon;