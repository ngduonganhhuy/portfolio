---
title: "Holmes AdBlock DNS: Chặn quảng cáo và tracker bằng DNS-over-HTTPS"
date: "2026-06-01"
time: 5 min read
cover: /images/articles/holmes-adblock-dns.png
summary: "Holmes AdBlock DNS là một DNS-over-HTTPS endpoint giúp chặn quảng cáo và tracker ở cấp hệ thống cho iPhone, iPad và macOS."
tags:
  - DNS
  - Privacy
  - AdBlock
---

Nếu bạn muốn giảm quảng cáo và tracker mà không cần cài thêm extension cho từng trình duyệt, DNS filtering là một cách tiếp cận gọn và hiệu quả. [Holmes AdBlock DNS](https://dns.holmes.id.vn/) dùng DNS-over-HTTPS để chặn các domain quảng cáo, tracking ngay từ lớp phân giải DNS.

Điểm hay của cách này là cấu hình được áp dụng ở cấp hệ thống. Khi iPhone, iPad hoặc macOS dùng profile DNS này, các app và trình duyệt sẽ đi qua cùng một DNS endpoint thay vì mỗi app phải tự có bộ chặn riêng.

### Holmes AdBlock DNS là gì?

Holmes AdBlock DNS là một server DNS-over-HTTPS được cấu hình để lọc domain quảng cáo và tracker. Theo trang cấu hình hiện tại, server đang chặn **110 domains**, dùng upstream DNS là **Cloudflare 1.1.1.1**, và expose endpoint:

```text
https://dns.holmes.id.vn/dns-query
```

DNS-over-HTTPS, thường viết tắt là DoH, gửi truy vấn DNS qua HTTPS. Điều này giúp truy vấn DNS khó bị đọc lén hoặc can thiệp hơn so với DNS truyền thống, đồng thời vẫn cho phép server áp dụng blocklist trước khi trả kết quả.

### Vì sao chặn ở tầng DNS?

Chặn quảng cáo bằng extension thường chỉ hoạt động trong một trình duyệt cụ thể. Nếu bạn dùng nhiều app, nhiều browser, hoặc muốn áp dụng đồng nhất trên thiết bị di động, DNS filtering tiện hơn vì nó xử lý trước khi kết nối tới domain đích được thiết lập.

Khi một app cố truy cập domain nằm trong blocklist, DNS server có thể không trả về địa chỉ hợp lệ. Kết quả là request quảng cáo hoặc tracker không đi tiếp được. Cách này nhẹ, ít cần thao tác sau khi cài đặt, và đặc biệt phù hợp cho các thiết bị Apple vì iOS/iPadOS/macOS hỗ trợ profile DNS.

### Cách cài đặt trên iPhone hoặc iPad

Trang Holmes AdBlock DNS cung cấp file `.mobileconfig` để cài nhanh trên thiết bị Apple. Quy trình cài đặt như sau:

1. Mở [dns.holmes.id.vn](https://dns.holmes.id.vn/) bằng Safari.
2. Nhấn nút cài đặt để tải file cấu hình.
3. Khi Safari hỏi quyền tải profile, chọn **Allow**.
4. Vào **Settings**, mở banner profile vừa tải.
5. Nhấn **Install**, nhập mật khẩu thiết bị nếu được yêu cầu, rồi xác nhận cài đặt.
6. Kiểm tra lại tại **Settings -> General -> VPN & Device Management**.

Sau khi cài xong, DNS profile sẽ được áp dụng cho toàn hệ thống. Bạn không cần cấu hình riêng cho từng trình duyệt.

### Thông tin server

Các thông tin chính từ trang cấu hình:

```text
DoH Endpoint: dns.holmes.id.vn/dns-query
Upstream DNS: Cloudflare 1.1.1.1
Blocklist: 110 domains
Protocol: DNS-over-HTTPS (RFC 8484)
```

Ngoài trang cài đặt cho người dùng, dịch vụ còn có khu vực quản lý blocklist tại `/admin`. Điều này phù hợp nếu bạn muốn tự quản lý danh sách domain bị chặn hoặc cập nhật blocklist theo nhu cầu cá nhân.

### Lưu ý khi sử dụng

DNS filtering không thay thế hoàn toàn ad blocker trong trình duyệt. Một số quảng cáo được phân phối từ cùng domain với nội dung chính, hoặc được nhúng theo cách khó chặn ở tầng DNS. Trong những trường hợp đó, browser extension vẫn có lợi thế vì nó nhìn thấy cấu trúc trang web.

Ngược lại, DNS filtering lại có lợi thế ở phạm vi áp dụng: nó có thể giảm tracking và request không mong muốn trên nhiều app khác nhau. Vì vậy, cách thực tế nhất là dùng Holmes AdBlock DNS như một lớp lọc nền, sau đó bổ sung extension nếu bạn cần mức chặn sâu hơn trong trình duyệt.

### Kết luận

Holmes AdBlock DNS là một lựa chọn đơn giản nếu bạn muốn có một lớp chặn quảng cáo và tracker ở cấp hệ thống cho thiết bị Apple. Với DoH endpoint riêng, upstream Cloudflare, file cấu hình `.mobileconfig`, và blocklist có thể quản lý, giải pháp này gọn hơn nhiều so với việc cấu hình từng app riêng lẻ.

Nếu bạn dùng iPhone, iPad hoặc macOS và muốn thử một DNS filter tự host, đây là một setup đáng để trải nghiệm.
