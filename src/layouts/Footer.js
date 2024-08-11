import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-200 border-t-2 border-[#393d6e] text-gray-800 mt-5">
      <div className="w-[90%] lg:w-[70%] mx-auto py-10 flex">
        {/* Column One */}
        <div className="col-span-1 grid grid-cols-2 flex-1 gap-x-10 ">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Về MoiMoi Shop</h3>
            <p className="text-sm leading-relaxed text-justify">
              MoiMoi Shop là nền tảng thương mại điện tử hiện đại, mang đến trải
              nghiệm mua sắm trực tuyến dễ dàng và tiện lợi. Với giao diện trực
              quan, MoiMoi Shop cho phép người dùng duyệt và mua sắm sản phẩm
              trên mọi thiết bị. Nền tảng cung cấp danh mục sản phẩm phong phú,
              thanh toán an toàn, và dịch vụ khách hàng tận tâm. MoiMoi Shop cam
              kết đem lại môi trường mua sắm trực tuyến đáng tin cậy, nơi khách
              hàng có thể tìm thấy sản phẩm chất lượng và dịch vụ xuất sắc.
            </p>
          </div>

          {/* Column Two */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Điều hướng</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.facebook.com/btanphat/"
                  target="_blank"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Column Three */}
        <div className="flex flex-col space-y-4 w-[50%]">
          <h3 className="text-xl font-semibold">Bản đồ</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.117229186079!2d107.08281447474856!3d10.332502567225646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175655890579393%3A0x72e1b540463b96e8!2zNTAgVsO1IFRo4buLIFPDoXUsIFBoxrDhu51uZyAyLCBUaMOgbmggcGjhu5EgVsWpbmcgVOG6p3UsIELDoCBS4buLYSAtIFbFqW5nIFTDoHUsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1721346355327!5m2!1svi!2s"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-[100%] h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full bg-gray-300 py-4">
        <div className="w-[90%] lg:w-[70%] mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2018 - 2024 MoiMoi Shop. Nền tảng mua sắm trực tuyến hàng đầu Việt
            Nam.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
