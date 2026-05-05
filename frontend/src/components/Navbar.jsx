import { useState } from "react";
import { Show, SignInButton, useAuth, UserButton } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { Link } from "react-router";

import {
  LogInIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useCart } from "../store/cart";

const Navbar = () => {
  const { getToken, isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me", { getToken }),
    enabled: isSignedIn,
  });

  const role = meData?.user?.role;

  const cartCount = useCart((s) =>
    s.items.reduce((n, line) => n + line.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 shadow-sm backdrop-blur-md">
      <div className="navbar mx-auto min-h-14 max-w-7xl px-4 py-2.5 md:px-6 md:py-3">
        
        {/* LEFT */}
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold tracking-wide md:text-xl"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 p-1 text-primary">
              <StoreIcon className="size-8" />
            </span>
            <span>ShopLive</span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-1.5">
          <Link to="/" className="btn btn-ghost gap-2 font-medium">
            <ShoppingBagIcon className="size-6" />
            <span>Shop</span>
          </Link>

          <Show when={"signed-in"}>
            <Link to="/orders" className="btn btn-ghost gap-2 font-medium">
              <PackageIcon className="size-6" />
              <span>Orders</span>
            </Link>

            {role === "admin" && (
              <Link to="/admin" className="btn btn-ghost gap-2 font-medium text-secondary">
                <SettingsIcon className="size-6" />
                <span>Admin</span>
              </Link>
            )}
          </Show>

          <Link
            to="/cart"
            className="btn btn-ghost gap-2 font-medium indicator"
          >
            {cartCount > 0 && (
              <span className="indicator-item badge badge-sm badge-primary">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
            <ShoppingCartIcon className="size-6" />
            <span>Cart</span>
          </Link>

          <Show when={"signed-out"}>
            <SignInButton mode="modal">
              <button className="btn btn-primary btn-sm">
                <LogInIcon className="size-4" />
                Sign in
              </button>
            </SignInButton>
          </Show>

          <Show when={"signed-in"}>
            <UserButton />
          </Show>
        </nav>

        {/* MOBILE HAMBURGER */}
        <div className="md:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 border-t border-base-300">
          <Link to="/" className="flex items-center gap-2 btn btn-ghost w-full justify-start">
            <ShoppingBagIcon className="size-5" />
            Shop
          </Link>

          <Show when={"signed-in"}>
            <Link to="/orders" className="flex items-center gap-2 btn btn-ghost w-full justify-start">
              <PackageIcon className="size-5" />
              Orders
            </Link>

            {role === "admin" && (
              <Link to="/admin" className="flex items-center gap-2 btn btn-ghost w-full justify-start text-secondary">
                <SettingsIcon className="size-5" />
                Admin
              </Link>
            )}
          </Show>

          <Link to="/cart" className="flex items-center gap-2 btn btn-ghost w-full justify-start">
            <ShoppingCartIcon className="size-5" />
            Cart ({cartCount})
          </Link>

          <Show when={"signed-out"}>
            <SignInButton mode="modal">
              <button className="btn btn-primary w-full">
                <LogInIcon className="size-4" />
                Sign in
              </button>
            </SignInButton>
          </Show>

          <Show when={"signed-in"}>
            <div className="pt-2">
              <UserButton />
            </div>
          </Show>
        </div>
      )}
    </header>
  );
};

export default Navbar;