import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import CartIcon from '@/components/cartIcon';

export default function Navbar() {
  const cartItemCount = 3;
  return (
    <nav className='w-full flex items-center justify-between p-4 shadow-md bg-white'>
      <div className='text-xl font-bold'>Remes</div>
      <CartIcon count={cartItemCount} />
      <NavigationMenu className={undefined}>
        <NavigationMenuList className={undefined}>
          <NavigationMenuItem className={undefined}>
            <NavigationMenuLink href='/' className={undefined}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={undefined}>
            <NavigationMenuLink href='/about' className={undefined}>
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={undefined}>
            <NavigationMenuLink href='/contact' className={undefined}>
              Contact
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
