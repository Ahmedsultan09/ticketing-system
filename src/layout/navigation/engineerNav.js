import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link as Direct, Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/bigdata-logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useFetchRegularVisits from "../../hooks/useFetchRegularVisits";
import useFetchTasks from "../../hooks/useFetchTasks";
const initialNavigation = [
  { name: "History", href: "/history", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EngineerNav({ id }) {
  const [navigation, setNavigation] = useState(initialNavigation);
  const [isCurrentCalls, setIsCurrentCalls] = useState(false);
  const [isCurrentRvs, setIsCurrentRvs] = useState(false);

  const regularVisits = useFetchRegularVisits(id);
  const tasks = useFetchTasks(id);

  const location = useLocation();
  useEffect(() => {
    setNavigation((prevNavigation) => {
      return prevNavigation.map((item) => ({
        ...item,
        current: item.href === location.pathname,
      }));
    });
  }, [location.pathname]);

  useEffect(() => {
    const location = window.location.pathname;
    if (location === "/") {
      setIsCurrentCalls(true);
    } else {
      setIsCurrentCalls(false);
    }
  }, [location]);
  useEffect(() => {
    const location = window.location.pathname;
    if (location === "/regular-visits") {
      setIsCurrentRvs(true);
    } else {
      setIsCurrentRvs(false);
    }
  }, [location]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={logo}
                    alt="big data logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center ">
                    <Direct
                      className={classNames(
                        isCurrentCalls
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={isCurrentCalls ? "page" : undefined}
                      to="/"
                    >
                      Calls{" "}
                      {tasks && (
                        <span className="w-full h-full rounded-md bg-lime-500 text-black px-1 mx-1">
                          {tasks?.length}
                        </span>
                      )}
                    </Direct>
                    <Direct
                      className={classNames(
                        isCurrentRvs
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={isCurrentRvs ? "page" : undefined}
                      to="/regular-visits"
                    >
                      Regular Visits{" "}
                      {regularVisits.length > 0 && (
                        <span className="w-full h-full rounded-md bg-lime-500 text-black px-1 mx-1">
                          {regularVisits.length}
                        </span>
                      )}
                    </Direct>

                    {navigation.map((item, index) => (
                      <Direct
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Direct>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <AccountCircleIcon className="bg-gray-800 text-gray-400 outline-none rounded-full border-none" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Direct
                            to={navigation.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Direct>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Direct
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Direct>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Direct
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Direct>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden pl-3">
            <div className="space-y-1  pb-3 pt-2">
              <Direct
                className={classNames(
                  isCurrentCalls
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 mr-2 text-base font-medium"
                )}
                aria-current={isCurrentCalls ? "page" : undefined}
                to="/"
              >
                Calls{" "}
                <span className="w-full h-full rounded-md bg-lime-500 text-black px-1 mx-1">
                  {tasks?.length}
                </span>
              </Direct>
              <Direct
                className={classNames(
                  isCurrentRvs
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 mr-2 text-base font-medium"
                )}
                aria-current={isCurrentRvs ? "page" : undefined}
                to="/regular-visits"
              >
                Regular Visits{" "}
                {regularVisits.length > 0 && (
                  <span className="w-full h-full rounded-md bg-lime-500 text-black px-1 mx-1">
                    {regularVisits.length}
                  </span>
                )}
              </Direct>

              {navigation.map((item, index) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-2 py-2 mr-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
          <div className="w-full h-[1px] bg-gray-500"></div>
        </>
      )}
    </Disclosure>
  );
}
