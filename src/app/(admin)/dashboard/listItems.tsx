import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainListItems = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Link href="/dashboard/products" passHref>
        <ListItemButton
          className={`${isActive("/dashboard/products") ? "bg-gray-400" : ""}`}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Produit" />
        </ListItemButton>
      </Link>
      <Link href="/dashboard/category" passHref>
        <ListItemButton
          className={`${isActive("/dashboard/category") ? "bg-gray-400" : ""}`}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Catégorie" />
        </ListItemButton>
      </Link>
      <Link href="/dashboard/order" passHref>
        <ListItemButton
          className={isActive("/dashboard/order") ? "bg-gray-400" : ""}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </Link>
      <Link href="/dashboard/upload-order-tracking" passHref>
        <ListItemButton
          className={
            isActive("/dashboard/upload-order-tracking") ? "bg-gray-400" : ""
          }
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Upload Tracking IDs" />
        </ListItemButton>
      </Link>
    </>
  );
};

export default MainListItems;
