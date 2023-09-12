# Learn useState
`useState` là một hook cơ bản trong react, cho phép bạn sử dụng trạng thái (state) trong các component chức năng (functional component). Trước đây, để sử dụng state, bạn phải dùng các component lớp (class component), nhưng với hook, bạn có thể viết code ngắn gọn và dễ đọc hơn.

Để sử dụng useState, bạn cần nhập nó từ thư viện react:

```js
import React, { useState } from 'react';
```

Sau đó, bạn có thể khai báo một biến state và một hàm để cập nhật nó bằng cách gọi useState với giá trị khởi tạo:

```js
const [count, setCount] = useState(0);
```

Biến count sẽ lưu trữ giá trị state hiện tại, còn hàm setCount sẽ cho phép bạn thay đổi giá trị state và gây ra việc render lại component. Bạn có thể gọi hàm setCount ở bất kỳ đâu trong component, ví dụ như trong một sự kiện click:

```js
<button onClick={() => setCount(count + 1)}>
  Click me
</button>
```

Bạn có thể khai báo nhiều biến state trong một component, miễn là bạn tuân theo quy tắc của hook: chỉ gọi hook ở mức cao nhất (không gọi trong vòng lặp, điều kiện hay hàm lồng) và chỉ gọi hook từ các component chức năng hoặc các hook tùy chỉnh.

useState là một hook rất hữu ích và linh hoạt, cho phép bạn quản lý trạng thái của component một cách dễ dàng và hiệu quả. Bạn có thể tìm hiểu thêm về useState và các hook khác tại [trang web chính thức của react](https://reactjs.org/docs/hooks-intro.html).