import Image from 'next/image'
import React from 'react'

export const DetailsCard = () => {
    return (

        <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
            <a href="#"
                className="max-w-3xl mx-auto text-xl sm:text-4xl font-semibold inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">The
                Lagos, Nigeria</a>

            <a href="#">
                <img className="w-full my-4"
                    src="https://images.pexels.com/photos/5120892/pexels-photo-5120892.jpeg?auto=compress&amp;cs=tinysrgb&amp;fit=crop&amp;h=625.0&amp;sharp=10&amp;w=1500"
                    alt="Sunset in the mountains" />
            </a>
            <p className="text-gray-700 text-base leading-8 max-w-2xl mx-auto">
                Weather is Partly Cloudy <Image className='inline' width={30} height={30}
                    src="https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
                    alt="Sunset in the mountains" />
            </p>
            <p className="text-gray-700 text-base leading-8 max-w-2xl mx-auto">
                Wind Speed: 18 km/h
            </p>
            <div className="py-5 text-sm font-regular text-gray-900 flex items-center justify-center">
                <span className="mr-3 flex flex-row items-center">
                    <svg className="text-indigo-600" fill="currentColor" height="13px" width="13px" version="1.1" id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 512 512">
                        <g>
                            <g>
                                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
              c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
              c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                            </g>
                        </g>
                    </svg>
                    <span className="ml-1">12:00pm</span></span>
                <a href="#" className="flex flex-row items-center hover:text-indigo-600  mr-3">
                    <svg className="text-indigo-600" fill="currentColor" height="16px" aria-hidden="true" role="img"
                        focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                        <path fill=""
                            d="M15.4496399,8.42490555 L8.66109799,1.63636364 L1.63636364,1.63636364 L1.63636364,8.66081885 L8.42522727,15.44178 C8.57869221,15.5954158 8.78693789,15.6817418 9.00409091,15.6817418 C9.22124393,15.6817418 9.42948961,15.5954158 9.58327627,15.4414581 L15.4486339,9.57610048 C15.7651495,9.25692435 15.7649133,8.74206554 15.4496399,8.42490555 Z M16.6084423,10.7304545 L10.7406818,16.59822 C10.280287,17.0591273 9.65554997,17.3181054 9.00409091,17.3181054 C8.35263185,17.3181054 7.72789481,17.0591273 7.26815877,16.5988788 L0.239976954,9.57887876 C0.0863319284,9.4254126 0,9.21716044 0,9 L0,0.818181818 C0,0.366312477 0.366312477,0 0.818181818,0 L9,0 C9.21699531,0 9.42510306,0.0862010512 9.57854191,0.239639906 L16.6084423,7.26954545 C17.5601275,8.22691012 17.5601275,9.77308988 16.6084423,10.7304545 Z M5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 C5.55228475,4 6,4.44771525 6,5 C6,5.55228475 5.55228475,6 5,6 Z">
                        </path>
                    </svg>
                    <span className="ml-1">Temperature is 28 degrees, feels like 32 degrees</span></a>
            </div>
            <hr />

        </div>

    )
}
