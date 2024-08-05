import React, { useState } from "react";

const FormComment = () => {
  const [formData, setFormData] = useState({
    gender: "Anh",
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="mt-3">
      <div>
        <textarea
          name="message"
          placeholder="Mời bạn tham gia thảo luận, vui lòng nhập tiếng Việt có dấu"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border rounded max-h-[250px] min-h-[250px]"
        ></textarea>
      </div>
      <div className="flex gap-x-5 mt-3">
        <div className="flex items-center space-x-4">
          <div>
            <input
              type="radio"
              id="anh"
              name="gender"
              value="Anh"
              checked={formData.gender === "Anh"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="anh">Anh</label>
          </div>
          <div>
            <input
              type="radio"
              id="chi"
              name="gender"
              value="Chị"
              checked={formData.gender === "Chị"}
              onChange={handleChange}
              className="mr-2 ml-4"
            />
            <label htmlFor="chi">Chị</label>
          </div>
        </div>
        <div className="flex-1 flex items-center space-x-4">
          <input
            type="text"
            name="fullName"
            placeholder="Họ tên (bắt buộc)"
            value={formData.fullName}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-300 rounded hover:bg-yellow-400 font-semibold"
        >
          GỬI
        </button>
      </div>
    </form>
  );
};

export default FormComment;
