import type { AnalysisMoment, AnalysisReport, AnalysisSkill } from '@/types/analysis.type';
import { CONVERSATION_OUTCOME, CONVERSATION_TRANSCRIPT } from './transcript.mock';

/**
 * Turning points in the demo conversation. Index here is what `TranscriptLine.momentIndex`
 * and `AnalysisSkill.relatedMoments` point at, and what the redo step's `momentIndex`
 * param selects — keep all three in sync when editing.
 */
export const ANALYSIS_MOMENTS: AnalysisMoment[] = [
  {
    head: 'Bạn mở bằng lý do, anh ấy chuyển sang hỏi cung.',
    before: 'Nói đi. Thứ Tư go-live, anh đã báo BGĐ rồi.',
    you: 'Dạ… bên đối tác payment gateway trả API doc trễ hai tuần, nên phần tích hợp bị dồn. Team em cũng đã cố hết sức rồi ạ.',
    react: 'Anh không cần biết lỗi bên nào. Anh hỏi: thứ Tư có go-live không?',
    note: 'Anh Kiên cần biết chiều nay nói gì với anh Tâm, không cần biết ai làm chậm. Lý do đi trước, trong ngữ cảnh này, nghe thành né.',
    skills: ['Phản hồi xây dựng', 'Minh bạch'],
    alt: {
      redo: 'Anh, thứ Tư không go-live được. Phần tích hợp thanh toán và test tải còn thiếu, team em ước 5 ngày làm việc. Phần em chịu là đã không chốt hạn cứng với đối tác từ tuần 2. Em có 2 phương án mốc mới để anh chọn.',
      why: 'Tin xấu, con số, phần mình, rồi phương án. Anh không cần đào vì không còn gì để đào.',
      newReact: 'Ừ. Hai phương án là gì? Nói anh nghe.',
      newState: 'HỎI VÀO VIỆC ↑',
      oldState: 'HỎI CUNG ↓',
      oldShort: 'Gạt câu của bạn, hỏi thẳng có go-live không.',
      newShort: 'Hỏi vào phương án, không hỏi lỗi ai.',
      coach:
        'Bạn đưa tin xấu và phần mình trước khi anh ấy phải hỏi, nên anh ấy chuyển ngay sang bàn phương án.',
      gap: 'Chưa có con số trong câu đầu; anh ấy vẫn phải hỏi "bao nhiêu ngày".',
      adjust: 'Đặt con số ngay trong câu đầu, trước cả phần mình chịu.',
    },
  },
  {
    kick: 'Chỗ mất nhiều nhất',
    head: 'Bị ép "nói số", bạn đưa một con số chưa kiểm tra.',
    before: '"Chắc", "nếu", "cố", "khoảng". Em nói con số đi. Trễ mấy ngày?',
    you: 'Dạ khoảng 3 ngày ạ. Em nghĩ thứ Bảy là xong.',
    react: 'Thứ Bảy? Hôm qua Tuấn nói với anh là còn 5 ngày test tải chưa chạy. Em với Tuấn ai đúng?',
    note: 'Khoảng lặng sau "nói số" làm bạn khó chịu, và bạn lấp nó bằng 3 ngày. Anh có số của Tuấn nên bắt được ngay.',
    skills: ['Kiểm soát cảm xúc', 'Minh bạch'],
    alt: {
      redo: 'Phần tích hợp 3 ngày, số này em chắc. Test tải em chưa có số vì phụ thuộc Tuấn, em không muốn đưa anh một con số chưa kiểm chứng. 14h em có, kèm giả định của từng con số.',
      why: '"Chưa có, mấy giờ có" là câu trả lời hợp lệ với mọi sếp. Con số bịa thì không.',
      newReact: 'Ừ. 14h gửi anh, có Tuấn xác nhận.',
      newState: 'GIỮ NIỀM TIN ↑',
      oldState: 'BẮT LỖI ↓',
      oldShort: 'Bắt lỗi ngay, so bạn với Tuấn.',
      newShort: 'Nhận mốc 14h, không so ai đúng.',
      coach: 'Bạn tách được số chắc và số chưa chắc, nên anh ấy không có gì để bắt lỗi.',
      gap: '"Vì phụ thuộc Tuấn" vẫn là một lý do. Anh ấy có thể nghe thành đổ sang Tuấn.',
      adjust: 'Nói giờ có số trước, rồi mới nói vì sao chưa có.',
    },
  },
  {
    head: 'Bị bắt lỗi, bạn giải thích thay vì nhận.',
    before:
      'Thứ Bảy? Hôm qua Tuấn nói với anh là còn 5 ngày test tải chưa chạy. Em với Tuấn ai đúng?',
    you: 'Dạ… Tuấn tính cả test tải, còn em tính phần tích hợp thôi. Em sẽ về check lại.',
    react: 'Tức là em đứng đây báo cho anh một con số chưa check. Anh phải nói gì với anh Tâm chiều nay?',
    note: 'Bạn giải thích cách tính. Anh chuyển từ hỏi về dự án sang hỏi về bạn. Càng giải thích, anh càng đào.',
    skills: ['Minh bạch', 'Kiểm soát cảm xúc'],
    alt: {
      redo: 'Anh nói đúng, con số 3 ngày em đưa thiếu phần test tải, đó là lỗi của em khi chưa đối chiếu với Tuấn. Để anh có gì nói với anh Tâm chiều nay: 14h em gửi anh hai dòng, mốc sớm nhất và mốc an toàn, cả hai có Tuấn xác nhận.',
      why: 'Nhận nhanh, không giải thích, rồi đưa ngay thứ anh đang cần nhất.',
      newReact: 'Được. 14h. Mốc an toàn là mốc anh sẽ báo anh Tâm.',
      newState: 'BÀN VIỆC ↑',
      oldState: 'TRUY NGƯỜI ↓',
      oldShort: 'Chuyển sang hỏi về bạn.',
      newShort: 'Quay lại bàn mốc.',
      coach:
        'Nhận thẳng làm anh ấy không cần đào nữa, và câu anh ấy cần để nói với anh Tâm đến ngay sau.',
      gap: 'Câu nhận còn dài; phần "vì chưa đối chiếu" lại là một lời giải thích.',
      adjust: 'Bỏ hẳn phần "vì chưa đối chiếu". Nhận rồi đi thẳng vào 14h.',
    },
  },
];

const ANALYSIS_SKILLS: AnalysisSkill[] = [
  {
    key: 'F1',
    name: 'Kiểm soát cảm xúc',
    score: 3.5,
    text: 'Bị ép "nói con số đi", bạn đưa ra 3 ngày dù chưa kiểm tra. Áp lực chọn thay bạn.',
    why: 'Anh bắt lỗi ngay câu sau, và cơ chế "báo mỗi ngày" là hệ quả trực tiếp.',
    evidence: {
      you: 'Dạ khoảng 3 ngày ạ. Em nghĩ thứ Bảy là xong.',
      react: 'Thứ Bảy? Hôm qua Tuấn nói với anh là còn 5 ngày test tải chưa chạy. Em với Tuấn ai đúng?',
      note: 'Anh bắt lỗi ngay câu sau. Cơ chế "báo mỗi ngày" là hệ quả trực tiếp.',
    },
    relatedMoments: [1, 2],
  },
  {
    key: 'A1',
    name: 'Phản hồi xây dựng',
    sub: 'báo tin xấu',
    score: 3.5,
    text: 'Câu đầu tiên là tên đối tác. Anh nghe thành bạn đang chuẩn bị để không phải chịu.',
    evidence: {
      you: 'Dạ… bên đối tác payment gateway trả API doc trễ hai tuần, nên phần tích hợp bị dồn.',
      react: 'Anh không cần biết lỗi bên nào. Anh hỏi: thứ Tư có go-live không?',
      note: 'Anh gạt cả câu và chuyển sang hỏi thẳng.',
    },
    relatedMoments: [0],
  },
  {
    key: 'A3',
    name: 'Minh bạch',
    score: 4.0,
    text: 'Bạn nắm rõ kỹ thuật và không đổ cho Tuấn khi bị so sánh. Nhưng phần mình chỉ được nhận khi bị truy, và mốc cuối do anh đặt.',
    evidence: {
      you: 'Dạ… Tuấn tính cả test tải, còn em tính phần tích hợp thôi. Em sẽ về check lại.',
      react: 'Tức là em đứng đây báo cho anh một con số chưa check.',
      note: 'Giải thích cách tính thay cho một câu nhận thẳng.',
    },
    relatedMoments: [0, 2],
  },
  {
    key: 'F3',
    name: 'Giao tiếp thấu cảm · Lắng nghe',
    score: null,
    text: 'Anh Kiên lạnh chứ không xúc động, và bạn không hỏi câu nào. Buổi này không tạo tình huống để chấm.',
  },
];

export const ANALYSIS_REPORT: AnalysisReport = {
  title: 'Báo trễ deadline cho sếp đang ép tiến độ',
  meta: 'Hôm qua, 15:40 · 6:12 · với anh Kiên, sếp trực tiếp',
  score: 3.7,
  overview:
    'Khi áp lực tăng, bạn tìm cách thoát khỏi khoảnh khắc khó chịu: bằng lý do, bằng "cố hết sức", rồi bằng một con số chưa kiểm tra. Mỗi lần như vậy anh Kiên tin bạn ít đi một chút.',
  strengthSkill: 'Phản hồi xây dựng · Minh bạch',
  strength:
    'Bạn nắm rõ tình hình kỹ thuật và không đổ cho Tuấn khi bị so sánh. Nguyên liệu để nói đúng bạn có đủ.',
  growthSkill: 'Kiểm soát cảm xúc',
  growth:
    'Một câu "em chưa có số, 14h em có" ở đúng chỗ bị ép sẽ giữ được toàn bộ uy tín còn lại.',
  themName: 'Anh Kiên',
  themInitial: 'K',
  brief:
    'Bạn mở đầu bằng lý do đối tác trả tài liệu trễ. Anh Kiên gạt ngay và hỏi thẳng: thứ Tư có go-live không. Bạn trả lời bằng "chắc", "nếu", "cố", "khoảng"; anh đếm từng chữ và đòi con số. Bạn nói 3 ngày, anh bắt lỗi vì Tuấn báo 5 ngày. Bạn giải thích cách tính rồi nói sẽ về kiểm tra lại. Bạn hứa cố hết sức, anh tự đặt mốc 16h và yêu cầu báo mỗi ngày tới go-live. Bạn xin lỗi, anh cắt phiên.',
  replay: (() => {
    const shiftLabels = [
      'Cuộc trò chuyện đổi hướng: anh chuyển sang hỏi cung',
      'Chỗ bạn mất nhiều nhất: một con số chưa kiểm tra',
      'Niềm tin bắt đầu chuyển từ việc sang người',
    ];
    const entries: AnalysisReport['replay'] = [];
    CONVERSATION_TRANSCRIPT.forEach(line => {
      if (line.stage) {
        entries.push({ kind: 'stage', label: line.stage });
      }
      entries.push({
        kind: 'turn',
        who: line.speaker === 'p1' ? 'Bạn' : 'Anh Kiên',
        text: line.text,
        isMe: line.speaker === 'p1',
      });
      if (line.momentIndex !== undefined) {
        entries.push({
          kind: 'shift',
          label: shiftLabels[line.momentIndex],
          momentIndex: line.momentIndex,
        });
      }
    });
    entries.push({ kind: 'outcome', text: CONVERSATION_OUTCOME });
    return entries;
  })(),
  skills: ANALYSIS_SKILLS,
  moments: ANALYSIS_MOMENTS,
  next: {
    head: 'Đừng lấp khoảng trống bằng một con số. Nói "chưa có" kèm giờ có.',
    why: 'Uy tín với anh Kiên không nằm ở việc bạn đúng, mà ở việc số của bạn tin được. Mọi thứ khác trong phiên (lý do, "cố hết sức", giải thích) đều là hệ quả của việc bạn không chịu được khoảng trống đó.',
    time: 'Vào phòng với hai cột đã viết sẵn: số chắc, và số chưa chắc kèm giờ có. Đọc theo thứ tự đó, không thêm bối cảnh.',
    drill: 'Tập một câu cho mọi lúc bị ép số: "số này em chưa chắc, [giờ] em có".',
  },
};
