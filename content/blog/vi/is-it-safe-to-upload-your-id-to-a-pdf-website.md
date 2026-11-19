---
title: Tải Hộ Chiếu Hoặc CCCD Lên Trang Web PDF Có An Toàn Không?
description: Trước khi tải ảnh hộ chiếu hay căn cước lên một trang PDF miễn phí, hãy đọc bài này. Rủi ro thực sự, những gì cần kiểm tra và cách làm bản sao an toàn hơn.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Mở tài khoản ngân hàng, đi làm chỗ mới, thuê nhà, xin thị thực: sớm muộn gì cũng có người yêu cầu "bản sao giấy tờ tùy thân, hai mặt, trên một trang, dạng PDF". Bạn chụp thẻ, tìm một công cụ PDF trực tuyến miễn phí, tải hai ảnh lên và tải kết quả về.

Đó là việc hoàn toàn bình thường. Nhưng bản sao giấy tờ tùy thân là một trong những thứ giá trị nhất bạn gửi qua internet. Bạn nên biết những hình ảnh đó đi đâu.

## Điều gì xảy ra khi bạn tải giấy tờ lên trang PDF

Phần lớn công cụ PDF trực tuyến xử lý tệp trên máy chủ của họ:

1. **Hình ảnh được gửi tới máy chủ của dịch vụ**, thường ở nước khác.
2. **Chúng được lưu ở đó trong lúc tạo PDF**, và thường cả sau đó. Có nơi giữ một giờ, có nơi giữ một ngày hoặc lâu hơn.
3. **Bản sao có thể nằm trong bản sao lưu và nhật ký** mà bạn không bao giờ thấy.

Phần lớn dịch vụ hoạt động có trách nhiệm. Nhưng mỗi nơi lưu giấy tờ của bạn là thêm một nơi có thể bị lộ: tấn công mạng, lưu trữ cấu hình sai, nhân viên có quá nhiều quyền. Và khác với mật khẩu, bạn không thể đổi số giấy tờ hay khuôn mặt.

## Vì sao bản sao bị lộ lại nguy hiểm

Ảnh giấy tờ rõ nét chứa mọi thứ kẻ gian cần để mạo danh bạn: họ tên, ngày sinh, ảnh, số giấy tờ và thường cả địa chỉ. Với chúng, kẻ gian có thể thử vay tiền hoặc mở tài khoản đứng tên bạn, vượt qua bước xác minh "tải giấy tờ lên" trong ứng dụng, đăng ký SIM hoặc thuê nhà. Có thể bạn chỉ biết khi bị gọi điện đòi nợ.

## Năm câu hỏi trước khi tải bất cứ thứ gì lên

1. **Tệp được xử lý trên thiết bị của tôi hay trên máy chủ của họ?** Nếu không rõ, hãy coi như bị tải lên.
2. **Họ giữ tệp bao lâu?** "Xóa sau một giờ" còn hơn không, nhưng "không bao giờ tải lên" tốt hơn.
3. **Ai vận hành trang web?** Có tên công ty, chính sách quyền riêng tư và thông tin liên hệ không?
4. **Có cần tài khoản không?** Đăng ký sẽ gắn giấy tờ của bạn với email trong hệ thống của họ.
5. **Tôi có kiểm tra được cách nó hoạt động không?** Mã nguồn của công cụ mã nguồn mở ai cũng xem được.

## Cách an toàn hơn: làm bản sao ngay trên trình duyệt

Bạn không cần tải gì lên để ghép hai mặt thẻ vào một trang. [Công cụ ghép giấy tờ của PDFCharger](/vi/tools/passport-id-composer/) xử lý trong trình duyệt, nên hình ảnh không rời khỏi thiết bị:

1. **Chụp rõ mặt trước và mặt sau**, đủ sáng, không lóa. Cắt mỗi ảnh sát mép thẻ.
2. **Mở [công cụ ghép giấy tờ](/vi/tools/passport-id-composer/)** và thêm hai ảnh. Hỗ trợ JPG, PNG và PDF.
3. **Thêm hình mờ** (xem bên dưới).
4. **Tạo PDF và tải về.** Bạn nhận một trang A4 với mặt trước ở trên, mặt sau ở dưới, mỗi mặt đúng kích thước thật của thẻ tiêu chuẩn (85,6 × 54 mm), nên in ra cũng chuẩn.

## Luôn thêm hình mờ vào bản sao

Hình mờ là cách đơn giản nhất khiến bản sao bị đánh cắp gần như vô dụng. Ghi rõ bản sao *cho ai*, *để làm gì* và *khi nào*, ví dụ:

> Copy for apartment rental only - 19/11/2026

Nếu bản sao đó xuất hiện ở nơi khác, rõ ràng nó đã bị lạm dụng. Công cụ lặp lại chữ của bạn theo đường chéo trên toàn trang với độ mờ thấp (15%), che phủ tất cả mà vẫn đọc được thông tin.

**Lưu ý:** viết ngắn gọn, chỉ dùng chữ cái Latin không dấu và chữ số; chữ tiếng Việt có dấu chưa được hỗ trợ.

## Chỉ chia sẻ những gì cần thiết

- **Hỏi xem có cần cả hai mặt không.** Đôi khi chỉ cần mặt có ảnh.
- **Che những gì không cần.** Nếu nơi nhận xác nhận không cần một thông tin nào đó, hãy xóa thật sự bằng [Che thông tin PDF](/vi/tools/redact-pdf/), thay vì chỉ phủ một ô đen. Một số nơi, nhất là ngân hàng, bắt buộc xem toàn bộ giấy tờ, nên hãy hỏi trước.
- **Đặt mật khẩu trước khi gửi email.** [Mã hóa PDF](/vi/tools/encrypt-pdf/) thêm mã hóa AES 256-bit ngay trong trình duyệt. Gửi mật khẩu qua kênh khác như tin nhắn hoặc cuộc gọi, không ghi trong cùng email.

## Dọn dẹp sau đó

Bản sao giờ có lẽ nằm ở nhiều nơi: thư viện ảnh điện thoại và bản sao lưu đám mây, thư mục Tải xuống, hộp thư đã gửi và ứng dụng nhắn tin bạn đã dùng. Xóa những bản không cần khi xong việc. Càng ít bản sao, càng ít rủi ro.

## Tóm lại

- Làm bản sao giấy tờ trên trình duyệt bằng [công cụ ghép giấy tờ](/vi/tools/passport-id-composer/), không tải gì lên.
- Thêm hình mờ: cho ai, để làm gì và ngày tháng.
- Chỉ chia sẻ những gì cần và đặt mật khẩu cho tệp.
- Xóa các bản sao rải rác khi xong việc.
