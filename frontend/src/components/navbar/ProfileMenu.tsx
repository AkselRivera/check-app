import { createElement, useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { openModal } from "../../utils/modal";
import Modal from "../share/Modal";
import { ResetServer } from "../modal/delete/ResetServer";

export default function ProfileMenu() {
  const [props, setProps] = useState({
    title: "",
    isOpen: false,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      func: () => {
        alert(`1`);
      },
    },
    {
      label: "Reset DB",
      icon: Cog6ToothIcon,
      func: () => {
        setProps((state) => ({
          ...state,
          title: "Reset Server DB",
          disabled: false,
        }));

        openModal({ setProps });
        closeMenu();
      },
    },
    // {
    //   label: "Inbox",
    //   icon: InboxArrowDownIcon,
    // },
    // {
    //   label: "Help",
    //   icon: LifebuoyIcon,
    // },
    {
      label: "Sign Out",
      icon: PowerIcon,
      func: () => {
        alert(`1`);
      },
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://raw.githubusercontent.com/marcusolsson/gophers/master/scientist.svg"
          />
          <span className="text-sm normal-case text-white font-medium">
            Guest
          </span>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-gray-800 border-0 shadow-xl">
        {profileMenuItems.map(({ label, icon, func }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                func();
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded   ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : "hover:bg-blue-gray-600 focus:bg-blue-gray-600 active:bg-blue-gray-600 "
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${
                  isLastItem ? "text-red-500" : " text-white opacity-70"
                }`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal opacity-80"
                color={isLastItem ? "red" : "white"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
      <Modal title={props.title} isOpen={props.isOpen}>
        <ResetServer setProps={setProps} />
      </Modal>
    </Menu>
  );
}
