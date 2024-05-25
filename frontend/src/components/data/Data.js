const navigation = {
  categories: [
    {
      id: "electronics",
      name: "Electronics",
      featured: [
        {
          name: "Computers",
          imageSrc:
            "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 ",
          imageAlt: "computer",
        },
        {
          name: "Gaming monitors",
          imageSrc:
            "https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          imageAlt: "gaming monitor",
        },
      ],
      sections: [
        {
          id: "laptops",
          name: "Laptops",
          items: [{ name: "Laptop bag" }, { name: "Laptops" }],
        },
        {
          id: "grooming appliances",
          name: "Grooming appliances",
          items: [
            { name: "Hair clipper" },
            { name: "Hair straightener" },
            { name: "Hairdryer" },
            { name: "Other hair care" },
          ],
        },
        {
          id: "computers",
          name: "Computers and accessories",
          items: [
            { name: "Keyboard" },
            { name: "Computers" },
            { name: "Gaming monitors" },
            { name: "Mouse" },
            { name: "Storage devices" },
          ],
        },
      ],
    },
    {
      id: "gaming",
      name: "Gaming",
      featured: [
        {
          name: "PlayStation 5",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/18417233/pexels-photo-18417233/free-photo-of-a-white-controller-sitting-on-top-of-a-white-box.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          imageAlt: "Playstation 5",
        },
        {
          name: "Xbox 360",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/18295025/pexels-photo-18295025/free-photo-of-xbox-controller-on-red-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          imageAlt: "Xbox 360",
        },
      ],
      sections: [
        {
          id: "consoles",
          name: "Consoles",
          items: [
            { name: "Nintendo switch" },
            { name: "PlayStation 4" },
            { name: "PlayStation 5" },
            { name: "Xbox One" },
            { name: "Xbox 360" },
          ],
        },
        {
          id: "games",
          name: "Games",
          items: [
            { name: "PC games" },
            { name: "Xbox games" },
            { name: "Playstation5 games" },
            { name: "Playstation4 games" },
          ],
        },
        {
          id: "virtual reality",
          name: "Virtual Reality",
          items: [
            { name: "Oculus Rift" },
            { name: "Other VR glasses" },
            { name: "PlayStation VR" },
          ],
        },
      ],
    },
    {
      id: "transport",
      name: "Transport",
      featured: [
        {
          name: "E bike",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/3671151/pexels-photo-3671151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          imageAlt: "E bike.",
        },
        {
          name: "SUV",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/215529/pexels-photo-215529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          imageAlt: "SUV",
        },
      ],
      sections: [
        {
          id: "bicycles",
          name: "Bicycles",
          items: [
            { name: "City bike" },
            { name: "E bike" },
            { name: "Mountain bike" },
            { name: "Other bicycles" },
            { name: "Racing bike" },
          ],
        },
        {
          id: "car",
          name: "Car",
          items: [{ name: "Hatchback" }, { name: "Sedan" }, { name: "SUV" }],
        },
        {
          id: "car accessories",
          name: "Car accessories",
          items: [
            { name: "car lights" },
            { name: "Puncture repair kit" },
            { name: "Sun shades" },
            { name: "Tyre Inflator" },
          ],
        },
      ],
    },
  ],
  pages: [{ name: "About Us" }],
};
