import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
 
import { Link, Navigate } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios'


// profile menu component
const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      path: "/my-profile"
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      path: "/logout"
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
      path: "/logout"
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
      path: "/logout"
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      path: "/logout"
    },
  ];
   
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies(['token']);


    const handleLogout = async(event) => {

        event.preventDefault();

        

        try {
            const response = await axios.post('http://localhost:8000/api/logout',{},{
                'headers' : {
                    'Authorization' : 'Bearer ' + cookies['token']
                }
            });

            if (response.status === 200) {
                removeCookie('token');
                localStorage.clear();
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }

    }

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
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={isLastItem ? handleLogout : closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }
   
  
   
  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   
    const triggers = {
      onMouseEnter: () => setIsMenuOpen(true),
      onMouseLeave: () => setIsMenuOpen(false),
    };
   
  }
   
  // nav list component
  const navListItems = [
    {
      label: "Account",
      icon: UserCircleIcon,
      path: "/account",
    },
    {
      label: "Blocks",
      icon: CubeTransparentIcon,
      path: "/blocks"
    },
    {
      label: "Docs",
      icon: CodeBracketSquareIcon,
      path: "/docss"
    },
  ];
   
  function NavList() {
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />
        {navListItems.map(({ label, icon , path}, key) => (
          <Typography
            key={label}
            as={Link}
            to={path}
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }

const Navbars = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    
    React.useEffect(() => {
        window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);
    return (
        <Navbar className="mx-auto max-w-full p-2 lg:rounded-none lg:pl-6" fullWidth blurred>
            <div className="relative mx-auto flex items-center text-blue-gray-900">
                <Typography
                as={Link}
                to='/dashboard'
                className="mr-4 ml-2 cursor-pointer py-1.5 font-bold"
                >
                Material Tailwind
                </Typography>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                <NavList />
                </div>
                <IconButton
                size="sm"
                color="blue-gray"
                variant="text"
                onClick={toggleIsNavOpen}
                className="ml-auto mr-2 lg:hidden"
                >
                <Bars2Icon className="h-6 w-6" />
                </IconButton>
                <ProfileMenu />
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );

}

export default Navbars;