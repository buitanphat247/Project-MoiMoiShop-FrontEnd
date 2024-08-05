import { Modal } from "antd";
import React from "react";

const CardFAQ = () => {
  const faqs = {
    "Chính sách bảo hành": [
      {
        question: "Chính sách bảo hành của cửa hàng là gì?",
        answer:
          "Cửa hàng chúng tôi cung cấp chính sách bảo hành 12 tháng cho tất cả các sản phẩm. Trong thời gian bảo hành, nếu có lỗi từ nhà sản xuất, khách hàng sẽ được hỗ trợ sửa chữa hoặc đổi mới sản phẩm.",
      },
      {
        question: "Sản phẩm nào được bảo hành?",
        answer:
          "Tất cả các sản phẩm điện thoại di động, máy tính bảng và phụ kiện chính hãng đều được bảo hành tại cửa hàng.",
      },
      {
        question: "Thủ tục bảo hành như thế nào?",
        answer:
          "Khách hàng cần mang sản phẩm và phiếu bảo hành đến cửa hàng để được hỗ trợ.",
      },
      {
        question: "Thời gian bảo hành là bao lâu?",
        answer: "Thời gian bảo hành là 12 tháng kể từ ngày mua hàng.",
      },
      {
        question: "Cửa hàng có hỗ trợ bảo hành tại nhà không?",
        answer:
          "Hiện tại chúng tôi chưa hỗ trợ bảo hành tại nhà. Khách hàng vui lòng mang sản phẩm đến cửa hàng.",
      },
      {
        question: "Sản phẩm đã qua sử dụng có được bảo hành không?",
        answer:
          "Sản phẩm đã qua sử dụng và còn trong thời gian bảo hành sẽ được hỗ trợ bảo hành.",
      },
      {
        question: "Có cần mang theo hóa đơn mua hàng khi bảo hành không?",
        answer:
          "Có, khách hàng cần mang theo hóa đơn mua hàng để được hỗ trợ bảo hành.",
      },
      {
        question: "Cửa hàng có bảo hành sản phẩm khi bị rơi vỡ không?",
        answer:
          "Chúng tôi không bảo hành cho các trường hợp rơi vỡ hoặc hư hỏng do người dùng gây ra.",
      },
      {
        question: "Phụ kiện kèm theo sản phẩm có được bảo hành không?",
        answer:
          "Phụ kiện kèm theo sản phẩm sẽ được bảo hành nếu còn trong thời gian bảo hành.",
      },
      {
        question: "Cửa hàng có dịch vụ bảo hành nhanh không?",
        answer:
          "Chúng tôi có dịch vụ bảo hành nhanh cho một số sản phẩm. Khách hàng vui lòng liên hệ cửa hàng để biết thêm chi tiết.",
      },
    ],
    "Chính sách trả góp": [
      {
        question: "Cửa hàng có hỗ trợ trả góp không?",
        answer:
          "Chúng tôi có hỗ trợ trả góp qua các ngân hàng và công ty tài chính đối tác. Khách hàng có thể liên hệ trực tiếp với cửa hàng để biết thêm chi tiết và các thủ tục cần thiết.",
      },
      {
        question: "Điều kiện để mua trả góp là gì?",
        answer:
          "Khách hàng cần có giấy tờ tùy thân và chứng minh thu nhập để đủ điều kiện tham gia chương trình trả góp.",
      },
      {
        question: "Lãi suất trả góp là bao nhiêu?",
        answer:
          "Lãi suất trả góp tùy thuộc vào ngân hàng hoặc công ty tài chính mà khách hàng chọn.",
      },
      {
        question: "Thời gian trả góp kéo dài bao lâu?",
        answer:
          "Thời gian trả góp thường kéo dài từ 6 tháng đến 24 tháng, tùy thuộc vào gói trả góp mà khách hàng chọn.",
      },
      {
        question: "Cần chuẩn bị giấy tờ gì để mua trả góp?",
        answer:
          "Khách hàng cần chuẩn bị giấy tờ tùy thân, chứng minh thu nhập và các giấy tờ liên quan khác theo yêu cầu của ngân hàng hoặc công ty tài chính.",
      },
      {
        question: "Có thể trả góp với thẻ tín dụng không?",
        answer:
          "Có, chúng tôi hỗ trợ trả góp qua thẻ tín dụng của một số ngân hàng liên kết.",
      },
      {
        question: "Có thể trả góp trước hạn không?",
        answer:
          "Khách hàng có thể trả góp trước hạn mà không bị phạt, tuy nhiên cần liên hệ với ngân hàng hoặc công ty tài chính để biết thêm chi tiết.",
      },
      {
        question: "Có chương trình khuyến mãi cho trả góp không?",
        answer:
          "Chúng tôi thường xuyên có các chương trình khuyến mãi cho khách hàng mua trả góp. Vui lòng liên hệ cửa hàng để biết thêm chi tiết.",
      },
      {
        question: "Làm thế nào để kiểm tra số tiền trả góp còn lại?",
        answer:
          "Khách hàng có thể kiểm tra số tiền trả góp còn lại qua ứng dụng hoặc trang web của ngân hàng hoặc công ty tài chính.",
      },
      {
        question: "Có thể thay đổi gói trả góp sau khi đăng ký không?",
        answer:
          "Khách hàng cần liên hệ trực tiếp với ngân hàng hoặc công ty tài chính để xem xét việc thay đổi gói trả góp.",
      },
    ],
    "Chính sách đổi trả": [
      {
        question: "Chính sách đổi trả sản phẩm của cửa hàng?",
        answer:
          "Khách hàng có thể đổi trả sản phẩm trong vòng 7 ngày kể từ ngày mua hàng nếu sản phẩm còn nguyên vẹn, chưa qua sử dụng và đầy đủ phụ kiện, hóa đơn mua hàng.",
      },
      {
        question: "Làm thế nào để đổi trả sản phẩm?",
        answer:
          "Khách hàng có thể mang sản phẩm và hóa đơn mua hàng đến cửa hàng hoặc liên hệ với bộ phận chăm sóc khách hàng để được hướng dẫn chi tiết.",
      },
      {
        question: "Sản phẩm đã qua sử dụng có được đổi trả không?",
        answer:
          "Sản phẩm đã qua sử dụng sẽ không được đổi trả trừ khi có lỗi từ nhà sản xuất.",
      },
      {
        question: "Phí đổi trả sản phẩm là bao nhiêu?",
        answer:
          "Phí đổi trả sản phẩm tùy thuộc vào tình trạng sản phẩm và thời gian đổi trả. Vui lòng liên hệ cửa hàng để biết thêm chi tiết.",
      },
      {
        question: "Có thể đổi trả sản phẩm mua online tại cửa hàng không?",
        answer:
          "Khách hàng có thể đổi trả sản phẩm mua online tại cửa hàng hoặc qua dịch vụ giao hàng.",
      },
      {
        question: "Thời gian xử lý đổi trả sản phẩm là bao lâu?",
        answer:
          "Thời gian xử lý đổi trả sản phẩm thường kéo dài từ 3 đến 7 ngày làm việc.",
      },
      {
        question: "Cửa hàng có hỗ trợ đổi trả sản phẩm bị lỗi không?",
        answer:
          "Chúng tôi hỗ trợ đổi trả sản phẩm bị lỗi trong vòng 7 ngày kể từ ngày mua hàng.",
      },
      {
        question: "Sản phẩm đã mở hộp có được đổi trả không?",
        answer:
          "Sản phẩm đã mở hộp nhưng chưa qua sử dụng và còn nguyên vẹn sẽ được hỗ trợ đổi trả.",
      },
      {
        question:
          "Cửa hàng có chính sách đổi trả đối với sản phẩm khuyến mãi không?",
        answer:
          "Sản phẩm khuyến mãi sẽ không được đổi trả trừ khi có lỗi từ nhà sản xuất.",
      },
      {
        question: "Có thể đổi sản phẩm lấy tiền mặt không?",
        answer:
          "Chúng tôi không hỗ trợ đổi sản phẩm lấy tiền mặt. Khách hàng có thể đổi sang sản phẩm khác hoặc nhận phiếu mua hàng.",
      },
    ],
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-5 underline uppercase">
        Câu hỏi thường gặp
      </h1>
      <div className="grid grid-cols-3 gap-x-5">
        {Object.keys(faqs).map((category, index) => (
          <div
            key={index}
            className="p-3 border-2 border-[#0f1654] shadow-xl rounded-md"
          >
            <h2 className="text-lg font-semibold mb-4">
              {index + 1}. {" " + category}
            </h2>
            <ul className="space-y-3 list-disc list-inside">
              {faqs[category].map((faq, index) => (
                <li
                  className="hover:underline cursor-pointer"
                  key={index}
                  onClick={() => {
                    Modal.info({
                      width: "30%",
                      title: <span>{faq.question}</span>,
                      content: (
                        <p className="text-justify space-y-3 ">{faq.answer}</p>
                      ),
                      onOk() {},
                    });
                  }}
                >
                  {faq.question}
                  {/* <h3 className="text-lg font-medium">{faq.question}</h3> */}
                  {/* <p className="text-gray-600">{faq.answer}</p> */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFAQ;
