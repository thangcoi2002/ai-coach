import type { SurveyQuestion } from '@/types/diagnostic.type';

/** 15 scenario questions, three per skill, used to estimate a starting level. */
export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    skill: 'LẮNG NGHE CHỦ ĐỘNG',
    question:
      'Sếp gọi vào phòng, nói nhanh: "Báo cáo quý phải xong thứ Hai, không lùi." Bạn biết số liệu vùng còn thiếu.',
    options: [
      'Nói "vâng ạ" rồi tự tìm cách, tối về mới nghĩ lại.',
      'Đưa luôn phương án: xin thêm hai ngày hoặc nộp bản thiếu.',
      'Hỏi lại xem thứ Hai sếp cần nó cho việc gì trước khi đáp.',
      'Nói thẳng là không kịp và giải thích lý do.',
    ],
  },
  {
    skill: 'PHẢN HỒI XÂY DỰNG',
    question: 'Một nhân viên nộp bản trình bày lần thứ ba vẫn sai định dạng bạn đã dặn.',
    options: [
      'Tự sửa cho nhanh, không nói gì.',
      'Nhắn: "Em xem lại format nhé", kèm mẫu.',
      'Ngồi lại, hỏi em ấy đang hiểu yêu cầu thế nào.',
      'Nói trước nhóm để mọi người cùng rút kinh nghiệm.',
    ],
  },
  {
    skill: 'KIỂM SOÁT CẢM XÚC',
    question: 'Trong họp, đồng nghiệp ngắt lời bạn lần thứ hai và nói ý của bạn là "chưa thực tế".',
    options: [
      'Im, chờ họp xong rồi bỏ qua.',
      'Nói lại to hơn để giữ ý mình.',
      'Dừng một nhịp, hỏi họ thấy chỗ nào chưa thực tế.',
      'Nhắn riêng sau họp để góp ý về cách ngắt lời.',
    ],
  },
  {
    skill: 'GIAO TIẾP THẤU CẢM',
    question:
      'Một nhân viên báo xin nghỉ đột xuất ngày mai vì "việc gia đình", đúng hôm nhóm chạy deadline.',
    options: [
      'Duyệt ngay, tự phân lại việc, không hỏi thêm.',
      'Hỏi có thật sự cần nghỉ cả ngày không.',
      'Hỏi xem em ấy có ổn không, rồi mới bàn việc.',
      'Nhắc rằng cả nhóm đang căng và cần em ấy.',
    ],
  },
  {
    skill: 'LẮNG NGHE CHỦ ĐỘNG',
    question:
      'Trong 1:1, nhân viên nói vòng vo về "mấy chuyện trong nhóm" mà không vào thẳng vấn đề.',
    options: [
      'Chờ nghe hết rồi tóm lại theo cách mình hiểu.',
      'Cắt ngang: "Ý em cụ thể là gì?"',
      'Nhắc lại một chi tiết em ấy vừa nói và hỏi thêm.',
      'Gợi ý luôn hướng xử lý để tiết kiệm thời gian.',
    ],
  },
  {
    skill: 'PHẢN HỒI XÂY DỰNG',
    question:
      'Bạn phải nói với một nhân viên giỏi rằng cách em ấy nói với đồng nghiệp đang làm người khác ngại làm việc chung.',
    options: [
      'Để lần review chính thức mới nói.',
      'Nói ngay nhưng mở đầu bằng khen để đỡ căng.',
      'Kể lại một tình huống cụ thể và điều bạn quan sát được.',
      'Nhờ HR hoặc người khác nói giúp.',
    ],
  },
  {
    skill: 'KIỂM SOÁT CẢM XÚC',
    question: 'Khách hàng gửi email chê nhóm bạn "thiếu chuyên nghiệp", cc cả sếp của bạn.',
    options: [
      'Trả lời ngay để giải thích từng điểm.',
      'Chờ hết ngày rồi mới trả lời.',
      'Gọi điện cho khách để hiểu chuyện gì đã xảy ra.',
      'Nhắn sếp trước để phòng bị.',
    ],
  },
  {
    skill: 'GIAO TIẾP THẤU CẢM',
    question: 'Nhân viên bị bạn từ chối đề xuất trong họp, sau đó im lặng cả buổi chiều.',
    options: [
      'Coi là bình thường, mai sẽ hết.',
      'Nhắn: "Em đừng để bụng nhé."',
      'Ghé qua, nói bạn thấy em ấy im và hỏi em ấy đang nghĩ gì.',
      'Giao thêm việc khác để em ấy bận và quên đi.',
    ],
  },
  {
    skill: 'LẮNG NGHE CHỦ ĐỘNG',
    question: 'Sếp góp ý về báo cáo của bạn nhưng bạn thấy phần lớn góp ý dựa trên hiểu nhầm.',
    options: [
      'Giải thích ngay chỗ sếp hiểu nhầm.',
      'Ghi nhận, về sửa theo ý sếp cho xong.',
      'Hỏi lại để chắc mình hiểu đúng điều sếp lo, rồi mới trả lời.',
      'Gật đầu, sau đó gửi email giải thích.',
    ],
  },
  {
    skill: 'PHẢN HỒI XÂY DỰNG',
    question: 'Một nhân viên hỏi thẳng: "Anh/chị thấy em làm thế nào?" sau một dự án có nhiều lỗi.',
    options: [
      'Nói chung chung: "Ổn, có vài chỗ cần cải thiện."',
      'Liệt kê các lỗi để em ấy rút kinh nghiệm.',
      'Hỏi em ấy tự thấy thế nào trước, rồi bổ sung quan sát của bạn.',
      'Hẹn nói kỹ vào dịp khác.',
    ],
  },
  {
    skill: 'KIỂM SOÁT CẢM XÚC',
    question: 'Bạn được báo phải trình bày thay sếp trước ban giám đốc trong 20 phút nữa.',
    options: [
      'Nhận lời rồi lo lắng suốt 20 phút.',
      'Từ chối vì chưa chuẩn bị.',
      'Hỏi rõ ban giám đốc cần quyết điều gì, rồi chuẩn bị đúng phần đó.',
      'Nhận lời và nói lại nguyên bản slide của sếp.',
    ],
  },
  {
    skill: 'GIAO TIẾP THẤU CẢM',
    question: 'Một nhân viên mới liên tục hỏi lại những điều bạn thấy đã rất rõ ràng.',
    options: [
      'Trả lời cụt để em ấy tự rút kinh nghiệm.',
      'Giao hẳn cho người khác kèm em ấy.',
      'Hỏi xem phần nào em ấy đang thấy chưa rõ nhất.',
      'Gửi lại tài liệu và nói tự đọc thêm.',
    ],
  },
  {
    skill: 'LẮNG NGHE CHỦ ĐỘNG',
    question:
      'Đối tác trình bày phương án hợp tác dài dòng, bạn đã đoán được kết luận từ giữa chừng.',
    options: [
      'Ngắt lời, nói thẳng kết luận để tiết kiệm thời gian.',
      'Gật đầu cho có, đầu óc nghĩ việc khác.',
      'Nghe hết, rồi tóm tắt lại để xác nhận đã hiểu đúng.',
      'Ghi chú rồi hẹn phản hồi sau qua email.',
    ],
  },
  {
    skill: 'PHẢN HỒI XÂY DỰNG',
    question:
      'Bạn thấy một đồng nghiệp ngang cấp đang làm sai quy trình nhưng không thuộc quyền quản lý của bạn.',
    options: [
      'Không nói gì, không phải việc của mình.',
      'Báo lên quản lý của người đó.',
      'Trao đổi trực tiếp, hỏi họ có thấy vướng ở đâu không.',
      'Nhắc khéo trong cuộc họp chung.',
    ],
  },
  {
    skill: 'KIỂM SOÁT CẢM XÚC',
    question:
      'Bạn vừa nhận tin dự án bị hủy sau ba tháng chuẩn bị, năm phút nữa phải vào họp với cả nhóm.',
    options: [
      'Vào họp và xả hết cảm xúc thật với nhóm.',
      'Hoãn họp vì chưa sẵn sàng.',
      'Dành một phút bình tĩnh lại, rồi vào nói rõ chuyện gì đã xảy ra.',
      'Nhờ người khác thông báo thay.',
    ],
  },
];
