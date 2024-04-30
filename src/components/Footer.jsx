import React from 'react'

export const Footer = () => {
    const widgetMenus = [
		{
			id: "1",
			title: "explore",
			menus: [
				{ label: "Flights" },
				{ label: "Maritime transport" },
				{ label: "Bus" },
				{ label: "Cars" },
			],
		},
		{
			id: "2",
			title: "resources",
			menus: [
				{ href: "/terms", label: "terms" },
				{ href: "/privacy", label: "privacy" },
				{ href: "/faqs", label: "faqs" },
			],
		},
		{
			id: "4",
			title: "getInTouch",
			menus: [
				{ href: "/contact", label: "contactUs" },
				{ href: "/about", label: "whoWeAre" },
				// {
				//   href: "mailto:info@telefreik.com",
				//   label: "emailContact", { email: "info@telefreik.com" },
				// },
				// {
				//   href: "tel:+(20 10 6362 6268",
				//   label:
				//     i18n.language === "en"
				//       ? "tel"
				//       : "tel" + (201063626268.toLocaleString("ar-u-nu-arab" + "+",
				// },
				// { href: "#", label: "location" },
			],
		},
	]

    const renderWidgetMenuItem = (menu, index) => {
		return (
			<div key={index} className="text-sm">
				<span className=" text-white sm:mt-0 font-[500] text-[19px]">{menu.title}</span>
				<ul className="space-y-5">
					{menu.menus.map((item, index) => (
						<li key={index} className="mt-3">
							{!!item?.href ? (
								<a
									key={index}
									className="text-[10px] text-white sm:text-[12px] "
									href={item?.href}
								>
									{item.label}
								</a>
							) : (
								<p className="text-[10px] text-white sm:text-[12px] ">
									{item.label}
								</p>
							)}
						</li>
					))}
				</ul>
				<div></div>
			</div>
		);
	};

  return (
   <div className="h-fit pt-[30px]  bg-gray-800 text-[#FFFFFF]   ">
			<div className="container gap-y-10 gap-x-5 sm:grid sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10 ">
				<div className=" col-span-2 grid gap-5 sm:grid-cols-4 md:col-span-4 lg:md:col-span-1 lg:relative lg:flex lg:flex-col">
					<div className=" mx-auto  h-[174px] w-[285px] md:col-span-1 lg:absolute lg:top-[-25px]">
						{/* <img src={logoImage} alt="logo footer" /> */}
                        <span>Logo</span>
					</div>
				</div>
				{widgetMenus.map(renderWidgetMenuItem)}
			</div>
			<div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
				<p className="text-sm text-white">{"footerDec"} </p>
				<span>©{"copyRight" } {  new Date().getFullYear() }</span>
			</div>
		</div>
  )
}
