### JOBIFY_MICROSERVICE

Chạy **docker-compose up -d** để build image và khởi động container

### Cấu trúc báo cáo

### **I. Mở đầu**

1. **Giới thiệu dự án**

   - Tổng quan về hệ thống cũ: Monolith.
   - Lý do chuyển đổi sang Microservices:
     - Khả năng mở rộng (Scalability).
     - Tính linh hoạt (Flexibility).
     - Khả năng bảo trì (Maintainability).

2. **Mục tiêu**
   - Phân tách hệ thống Monolith thành các dịch vụ Microservices.
   - Bổ sung API Gateway để quản lý truy cập và tăng cường bảo mật.

---

### **II. Kiến trúc hệ thống**

1. **Hệ thống Monolith ban đầu**

   - Tất cả các chức năng như xác thực (auth), quản lý đơn ứng tuyển (job), và các API khác được tích hợp trong một ứng dụng duy nhất.

2. **Hệ thống Microservices sau chuyển đổi**

   - **API Gateway**: Quản lý truy cập, điều hướng đến các dịch vụ cụ thể.
   - **Auth-Service**: Quản lý xác thực và ủy quyền.
   - **Job-Service**: Quản lý đơn ứng tuyển và các API liên quan.
   - **Database tách biệt**: Mỗi dịch vụ quản lý dữ liệu riêng.
   - **Giao tiếp giữa các dịch vụ**: Sử dụng REST API hoặc message queue (nếu cần).

3. **Lưu đồ kiến trúc**  
   (Bao gồm API Gateway, Auth-Service, Job-Service, và Database).

```
jobify_microservice/
├── api-gateway/
│   ├── index.js
│   ├── service.js
│   └── errors/
├── services/
│   ├── auth-service/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── app.js
│   └── job-service/
│       ├── models/
│       ├── routes/
│       ├── controllers/
│       └── app.js
│
└── docker-compose.yml
```

---

### **III. API Gateway**

1. **Vai trò của API Gateway**

   - Tổng hợp các điểm truy cập API.
   - Quản lý bảo mật (CORS, rate limiting, timeout).
   - Ủy quyền request đến các microservices.

2. **Source Code API Gateway**

   - **Các tính năng chính**:
     - Xử lý CORS, bảo mật với Helmet.
     - Rate limiting và xử lý timeout.
     - Reverse proxy với `http-proxy-middleware`.
   - **Cấu hình Service** (`services.js`):
        ```javascript
        const services = [
        {
            route: '/auth',
            target: 'http://auth-service:5200/auth',
        },
        {
            route: '/jobs',
            target: 'http://job-service:5300/jobs',
        },
        ]
        module.exports = services
        ```
   - **Middleware xử lý lỗi**:
     - `not-found.js`: Xử lý khi route không tồn tại.
     - `error-handler.js`: Xử lý lỗi chung.

3. **Ưu điểm của API Gateway**
   - Đơn giản hóa giao tiếp giữa client và hệ thống.
   - Dễ dàng thêm tính năng bảo mật và kiểm soát truy cập.

---

### **IV. Auth-Service**

1. **Mô tả chức năng**

   - Đăng ký, đăng nhập.
   - Quản lý token (JWT, OAuth).

2. **Các API chính**

   - POST `/auth/register`: Đăng ký tài khoản.
   - POST `/auth/login`: Đăng nhập và trả về JWT.
   - PATCH `/auth/update`: Sửa thông tin người dùng.

3. **Cơ sở dữ liệu**
   - Bảng `users`: Chứa thông tin người dùng.

---

### **V. Job-Service**

1. **Mô tả chức năng**

   - Quản lý đơn úng tuyển.
   - Tìm kiếm, tạo, sửa, xóa đơn.

2. **Các API chính**

   - GET `/jobs`: Lấy danh sách đơn ứng tuyển.
   - POST `/jobs`: Tạo đơn ứng tuyển mới.
   - PUT `/jobs/:id`: Cập nhật đơn ứng tuyển.
   - DELETE `/jobs/:id`: Xóa đơn ứng tuyển.
   - GET `/showStats`: Báo cáo thống kê về tình trạng đơn ứng tuyển được tạo.

3. **Cơ sở dữ liệu**
   - Bảng `jobs`: Chứa thông tin công việc.

---

### **VI. Lợi ích sau chuyển đổi**

1. **So sánh Monolith và Microservices**

   - Tăng khả năng mở rộng: Dịch vụ có thể được scale riêng biệt.
   - Tăng khả năng chịu lỗi: Một dịch vụ lỗi không ảnh hưởng toàn hệ thống.
   - Tăng tốc độ phát triển: Các nhóm có thể làm việc độc lập trên từng dịch vụ.

2. **Hiệu quả vận hành**
   - Thời gian phản hồi tốt hơn.
   - Dễ dàng tích hợp công nghệ mới cho từng dịch vụ.

---

