import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition, Menu} from '@headlessui/react'
import { ArrowUpOnSquareStackIcon, Bars3Icon, UserCircleIcon, BellIcon, XMarkIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import Chatdrawer from '../drawer/ChatDrawer'
import { useAuth } from '../../hooks/authRedirectHook'
import { useNavigate } from 'react-router-dom'




const navigation = {
  categories: [
    {
      id: 'electronics',
      name: 'Electronics',
      featured: [
        {
          name: 'Computers',
          imageSrc: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 ',
          imageAlt: 'computer',
        },
        {
          name: 'Gaming monitors',
          imageSrc: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          imageAlt: 'gaming monitor',
        },
      ],
      sections: [
        {
          id: 'laptops',
          name: 'Laptops',
          items: [
            { name: 'Laptop bag'},
            { name: 'Laptops'},
          ],
        },
        {
          id: 'grooming appliances',
          name: 'Grooming appliances',
          items: [
            { name: 'Hair clipper'},
            { name: 'Hair straightener'},
            { name: 'Hairdryer'},
            { name: 'Other hair care'},
          ],
        },
        {
          id: 'computers',
          name: 'Computers and accessories',
          items: [
            { name: 'Keyboard'},
            { name: 'Computers'},
            { name: 'Gaming monitors'},
            { name: 'Mouse'},
            { name: 'Storage devices'},
          ],
        },
      ],
    },
    {
      id: 'gaming',
      name: 'Gaming',
      featured: [
        {
          name: 'PlayStation 5',
          href: '#',
          imageSrc: 'https://images.pexels.com/photos/18417233/pexels-photo-18417233/free-photo-of-a-white-controller-sitting-on-top-of-a-white-box.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          imageAlt: 'Playstation 5',
        },
        {
          name: 'Xbox 360',
          href: '#',
          imageSrc: 'https://images.pexels.com/photos/18295025/pexels-photo-18295025/free-photo-of-xbox-controller-on-red-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          imageAlt:
            'Xbox 360',
        },
      ],
      sections: [
        {
          id: 'consoles',
          name: 'Consoles',
          items: [
            { name: 'Nintendo switch'},
            { name: 'PlayStation 4'},
            { name: 'PlayStation 5'},
            { name: 'Xbox One'},
            { name: 'Xbox 360'},
          ],
        },
        {
          id: 'games',
          name: 'Games',
          items: [
            { name: 'PC games'},
            { name: 'Xbox games'},
            { name: 'Playstation5 games'},
            { name: 'Playstation4 games'},
          ],
        },
        {
          id: 'virtual reality',
          name: 'Virtual Reality',
          items: [
            { name: 'Oculus Rift'},
            { name: 'Other VR glasses'},
            { name: 'PlayStation VR'},
          ],
        },
      ],
    },
    {
      id: 'transport',
      name: 'Transport',
      featured: [
        {
          name: 'E bike',
          href: '#',
          imageSrc: 'https://images.pexels.com/photos/3671151/pexels-photo-3671151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          imageAlt: 'E bike.',
        },
        {
          name: 'SUV',
          href: '#',
          imageSrc: 'https://images.pexels.com/photos/215529/pexels-photo-215529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          imageAlt:
            'SUV',
        },
      ],
      sections: [
        {
          id: 'bicycles',
          name: 'Bicycles',
          items: [
            { name: 'City bike' },
            { name: 'E bike'},
            { name: 'Mountain bike' },
            { name: 'Other bicycles' },
            { name: 'Racing bike' },
          ],
        },
        {
          id: 'car',
          name: 'Car',
          items: [
            { name: 'Hatchback' },
            { name: 'Sedan'},
            { name: 'SUV'},
          ],
        },
        {
          id: 'car accessories',
          name: 'Car accessories',
          items: [
            { name: 'car lights' },
            { name: 'Puncture repair kit' },
            { name: 'Sun shades' },
            { name: 'Tyre Inflator'},
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'About Us'},
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Appheader() {
  const [open, setOpen] = useState(false)
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen} style={{backgroundColor: 'white'}}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-50" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-dark-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={"/products/category/"+item.name.toLowerCase().replace(' ','')} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        { !auth.hasaccessToken && 
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <p>|</p>
                  {/* <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> */}
                  <a href="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
        </div>
        </div>}

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="/media/logo1.png"
                    alt=""
                  />
                </a>
              </div>
              {/* Flyout menus */}
              <div className="ml-8 lg:flex items-center h-16">
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 border-b-2 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center  pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 bg-black-50">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-black-50" style={{zIndex: 1}}>
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={"/products/category/"+item.name.toLowerCase().replace(' ','')} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={"/products/category/"+item.name.toLowerCase().replace(' ','')} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>
              </div>

                { auth.hasaccessToken && 
              <div className="ml-auto flex items-center">
                <div className="flex lg:ml-6">
                  <p className="p-2 text-gray-400 hover:text-gray-500 font-medium text-gray-900 text-sm">
                     Start Posting</p>
                  <a href="/PostItems" className="p-2 text-gray-400 hover:text-gray-500">
                    <ArrowUpOnSquareStackIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>
                
                
                <div className="ml-4 flow-root lg:ml-6 relative">
                  <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ">
                      <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-95 origin-top-right rounded-md bg-black-50 shadow-lg ">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/settings"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Account settings
                            </a>
                          )}
                        </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/logout"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block w-full px-4 py-2 text-left text-sm'
                                )}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              </div>}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}