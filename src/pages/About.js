import { Button } from "antd";
import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800 rounded-xl overflow-hidden mt-5 shadow-lg border-2 border-gray-800">
      <header className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold">About MoimoiShop</h1>
          <p className="mt-2 text-lg">
            Discover more about our project, design team, and technologies used
          </p>
        </div>
      </header>
      <main className="container mx-auto px-6 py-10">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Project Introduction</h2>
          <p className="text-lg">
            MoimoiShop is an innovative e-commerce platform dedicated to
            providing a seamless shopping experience. Our goal is to offer a
            wide range of high-quality products, coupled with exceptional
            customer service, making online shopping enjoyable and hassle-free.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Design Team</h2>
          <p className="text-lg mb-4">
            The MoimoiShop project was meticulously designed and developed by a
            talented team of professionals. Our design team, led by renowned
            UX/UI designer Jane Doe, has worked tirelessly to ensure that our
            platform is both aesthetically pleasing and user-friendly.
          </p>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
              <img
                src="https://via.placeholder.com/500"
                alt="Design Team"
                className="rounded shadow"
              />
            </div>
            <div className="w-full md:w-1/2 px-4">
              <p className="text-lg">
                Jane Doe has over 15 years of experience in the design industry
                and has led multiple successful projects. Under her guidance,
                our team of designers and developers have created a platform
                that is not only visually appealing but also highly functional.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Design Methodology</h2>
          <p className="text-lg">
            Our design methodology is centered around the user. We employ a
            user-centric approach to ensure that every aspect of MoimoiShop is
            tailored to meet the needs and preferences of our customers. Our
            process involves extensive user research, prototyping, and iterative
            testing to refine the user experience continuously.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Technologies Used</h2>
          <p className="text-lg mb-4">
            MoimoiShop is built using cutting-edge technologies to deliver a
            robust and scalable platform. Our tech stack includes:
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>
              React.js for the frontend, providing a responsive and dynamic user
              interface.
            </li>
            <li>
              Node.js and Express.js for the backend, ensuring efficient and
              scalable server-side operations.
            </li>
            <li>
              Tailwind CSS for styling, offering a utility-first approach to
              design.
            </li>
            <li>
              RESTful APIs to facilitate seamless communication between the
              frontend and backend.
            </li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Database</h2>
          <p className="text-lg">
            We use MongoDB as our primary database, leveraging its flexibility
            and scalability to handle large volumes of data. MongoDB's
            document-oriented structure allows us to store and retrieve data
            efficiently, ensuring fast and reliable performance for our users.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Us</h2>
          <p className="text-lg">
            Become a part of the MoimoiShop family. Follow us on social media
            and subscribe to our newsletter to stay updated with the latest
            products and offers. We are committed to making your shopping
            experience as enjoyable as possible.
          </p>
          <div className="mt-4">
            <Button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Subscribe to Newsletter
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>© 2024 MoimoiShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
