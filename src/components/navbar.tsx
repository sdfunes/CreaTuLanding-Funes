import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import CartIcon from '@/components/cartIcon';
import { cartContext } from '../context/CartContext';
import { useContext, useEffect, useState } from 'react';

export default function Navbar() {
  const { cart } = useContext(cartContext);
  console.log('Cart items:', cart);
  const cartItemCount = cart.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );
  return (
    <nav className='w-full flex items-center justify-between p-4 shadow-md bg-white'>
      <div className='text-xl font-bold'>Remes</div>
      <CartIcon count={cartItemCount} cartItems={cart} />
      <NavigationMenu className={undefined}>
        <NavigationMenuList className={undefined}>
          <NavigationMenuItem className={undefined}>
            <NavigationMenuLink href='/' className={undefined}>
              Inicio
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={undefined}>
            <NavigationMenuLink href='/ayuda' className={undefined}>
              Ayuda
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={undefined}>
            <NavigationMenuLink href='/contacto' className={undefined}>
              Contacto
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button className={undefined} variant={undefined} size={undefined}>
        Login
      </Button>
    </nav>
  );
}
