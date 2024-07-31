import React from "react";

const Footer = () => {
  return (
    <div className="border-t-2 border-[rgba(15,22,84,1)] bg-white mt-5">
      <div className="w-[70%] mx-auto flex justify-around py-5">
        {/* Column One */}
        <div className="flex-1 gap-4 flex flex-col items-start flex-grow overflow-clip font-['Roboto']">
          <p className="text-base font-semibold leading-normal m-0">
            Column One
          </p>
          <div className="w-full flex flex-col items-start font-normal">
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link One</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Two</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Three</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Four</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Five</p>
            </div>
          </div>
        </div>

        {/* Column Two */}
        <div className="flex-1 gap-4 flex flex-col items-start flex-grow overflow-clip font-['Roboto']">
          <p className="text-base font-semibold leading-normal m-0">
            Column Two
          </p>
          <div className="w-full flex flex-col items-start font-normal">
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Six</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Seven</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Eight</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Nine</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Ten</p>
            </div>
          </div>
        </div>

        {/* Column Three */}
        <div className="flex-1 gap-4 flex flex-col items-start flex-grow overflow-clip font-['Roboto']">
          <p className="text-base font-semibold leading-normal m-0">
            Column Three
          </p>
          <div className="w-full flex flex-col items-start font-normal">
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Eleven</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Twelve</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Thirteen</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Fourteen</p>
            </div>
            <div className="py-2 w-full">
              <p className="text-sm leading-normal m-0">Link Fifteen</p>
            </div>
          </div>
        </div>

        {/* Google Maps iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.117229186079!2d107.08281447474856!3d10.332502567225646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175655890579393%3A0x72e1b540463b96e8!2zNTAgVsO1IFRo4buLIFPDoXUsIFBoxrDhu51uZyAyLCBUaMOgbmggcGjhu5EgVsWpbmcgVOG6p3UsIELDoCBS4buLYSAtIFbFqW5nIFTDoHUsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1721346355327!5m2!1svi!2s"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mx-auto"
          width="600"
          height="250"
        ></iframe>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#e5e5e5]">
        <div className="w-[70%] mx-auto flex justify-between items-center py-3">
          <p className="text-sm leading-normal">
            © 2018 - 2024 MoiMoi Shop. Nền tảng mua sắm trực tuyến hàng đầu Việt
            Nam.
          </p>
          <div className="flex gap-3 items-center">
            <a href="#" className="text-[rgba(15,22,84,1)] hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-[rgba(15,22,84,1)] hover:underline">
              Terms of Service
            </a>
            {/* Add more links as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
