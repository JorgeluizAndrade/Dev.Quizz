"use client";

import { User } from "next-auth";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User as NextUIUser,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

type Props = {
  user: Pick<User, "name" | "email" | "image">;
};

const UserAccount = ({ user }: Props) => {

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <NextUIUser
            as="button"
            avatarProps={{
              isBordered: true,
              src: user.image || "",
            }}
            className="transition-transform"
            description={user.email}
            name={user.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="configurations">Wowww</DropdownItem>
          <DropdownItem key="help_and_feedback">
            <a href="https://www.linkedin.com/in/jorge-andradesouza/">
              Help & Feedback
            </a>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={(e) => {
                e.preventDefault()
              signOut().catch(console.error);
            }}
          >
            Log Out 
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserAccount;
