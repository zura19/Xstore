import { HiMiniBars3, HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import SidebarItem from "./SidebarItem";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiMacbookLine } from "react-icons/ri";
import SidebarFull from "./SidebarFull";

export default function Sidebar() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col gap-4  items-center bg-white p-2 border-r border-gray-400 border-opacity-30">
        <SidebarItem main={true}>
          <HiMiniBars3 size={20} color="white" />
        </SidebarItem>

        <SidebarItem to={"/category/phone"} main={false}>
          <HiOutlineDevicePhoneMobile size={24} color="black" />
        </SidebarItem>

        <SidebarItem to={"/category/laptop"} main={false}>
          <RiMacbookLine size={24} color="black" />
        </SidebarItem>

        <SidebarItem to={"/category/apple"} main={false}>
          <FaApple size={24} color="black" />
        </SidebarItem>

        <SidebarItem to={"/category/google"} main={false}>
          <FcGoogle size={24} />
        </SidebarItem>
      </div>
      <SidebarFull />
    </div>
  );
}
