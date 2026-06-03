---
title: "Holmes CLI: Tạo boilerplate dự án đa ngôn ngữ từ terminal"
date: "2026-06-03"
time: 8 min read
cover: /images/articles/holmes-cli.svg
summary: "Holmes CLI giúp tạo nhanh scaffold dự án cho nhiều ngôn ngữ và kiến trúc, hỗ trợ interactive mode, dry-run, Docker, GitHub Actions, Swift options và lệnh upgrade."
tags:
  - CLI
  - Boilerplate
  - Developer Tools
---

# Tôi tốn token - Bạn khỏi tốn
# Holmes - CLI Boilerplate

Holmes là CLI dùng để tạo nhanh scaffold dự án theo nhiều ngôn ngữ và kiến trúc khác nhau. CLI có thể chạy theo chế độ hỏi đáp tương tác hoặc truyền đầy đủ option để dùng trong script.

## Yêu cầu

- Node.js `>=18`
- npm, pnpm, yarn hoặc bun nếu bạn tạo template JavaScript/TypeScript
- Toolchain tương ứng với ngôn ngữ dự án được tạo, ví dụ Go, Rust, Java, .NET, Swift...

## Cài đặt

Khi package đã được publish:

```bash
npm install -g holmes
```

Trong repo này, dùng local build:

```bash
npm install
npm run build
npm link
```

Sau đó kiểm tra CLI:

```bash
holmes --help
holmes --version
```

## Tạo dự án mới

Chạy interactive mode:

```bash
holmes
```

Hoặc truyền tên dự án trước:

```bash
holmes my-app
```

Nếu thiếu `project-name`, `--language` hoặc `--template`, Holmes sẽ hỏi tiếp các thông tin còn lại:

- Ngôn ngữ
- Template / kiến trúc
- Vị trí tạo project
- Tác giả
- License
- Có tạo test hay không
- Có tạo Dockerfile hay không, nếu template hỗ trợ
- Có tạo GitHub Actions hay không, nếu template hỗ trợ
- Với Swift: dùng SwiftUI hay UIKit
- Với Swift: có dùng storage hay không; nếu có thì chọn SwiftData hoặc Core Data
- Package manager cho JavaScript/TypeScript

## Ví dụ nhanh

Tạo Go project cơ bản:

```bash
holmes hello-go --language go --template basic
```

Tạo TypeScript Clean Architecture, dùng pnpm và không tạo test:

```bash
holmes api-service \
  --language typescript \
  --template clean-architecture \
  --package-manager pnpm \
  --no-tests
```

Tạo TypeScript theo MVVM:

```bash
holmes desktop-shell --language typescript --template mvvm
```

Tạo project theo feature-first:

```bash
holmes users-service --language go --template feature-first
```

Tạo project theo layer-first:

```bash
holmes billing-core --language java --template layer-first
```

Xem trước file sẽ được tạo mà không ghi ra disk:

```bash
holmes preview-app --language rust --template basic --dry-run
```

Tạo project vào thư mục chỉ định:

```bash
holmes billing --language java --template mvc --output ./services/billing
```

Ghi đè file đã tồn tại mà không hỏi:

```bash
holmes my-app --language go --template basic --force
```

Tạo Swift project dùng SwiftUI và SwiftData:

```bash
holmes ios-notes --language swift --template basic --ui swiftui --storage swiftdata
```

Tạo Swift project dùng UIKit và Core Data:

```bash
holmes ios-tasks --language swift --template mvc --ui uikit --storage coredata
```

## Cú pháp

```bash
holmes [options] [project-name]
holmes upgrade [options]
```

### Options tạo project

| Option | Mặc định | Mô tả |
| --- | --- | --- |
| `project-name` |  | Tên project cần tạo. Chỉ dùng chữ thường, số, dấu `.`, `_`, `-` và phải bắt đầu bằng chữ hoặc số. |
| `-l, --language <lang>` |  | Ngôn ngữ lập trình. Ví dụ: `go`, `typescript`, `javascript`, `swift`. |
| `-t, --template <arch>` |  | Template / kiến trúc. Ví dụ: `basic`, `mvc`, `mvvm`, `clean-architecture`, `feature-first`, `layer-first`. |
| `--author <name>` | `""` | Tên tác giả ghi vào template nếu template dùng biến này. |
| `--license <spdx>` | `MIT` | License của project. |
| `--no-tests` |  | Không tạo file test scaffold. |
| `--docker` | `false` | Tạo Dockerfile nếu template hỗ trợ. |
| `--github-actions` | `false` | Tạo workflow GitHub Actions nếu template hỗ trợ. |
| `--ui <framework>` |  | Swift only. Chọn UI framework: `swiftui` hoặc `uikit`. |
| `--storage <provider>` |  | Swift only. Chọn storage provider: `none`, `swiftdata` hoặc `coredata`. |
| `--pm, --package-manager <pm>` | `npm` | Package manager cho JavaScript/TypeScript: `npm`, `pnpm`, `yarn`, `bun`. |
| `--dry-run` | `false` | Chỉ preview danh sách file, không ghi file. |
| `-o, --output <dir>` | `./<project-name>` | Thư mục output. |
| `-f, --force` | `false` | Ghi đè file đã tồn tại mà không hỏi xác nhận. |
| `-v, --version` |  | In version CLI. |
| `-h, --help` |  | In hướng dẫn sử dụng. |

## Templates đang hỗ trợ

Holmes hiện hỗ trợ 11 ngôn ngữ. Mỗi ngôn ngữ đều có đủ các template `basic`, `mvc`, `mvvm`, `clean-architecture`, `feature-first`, `layer-first`.

Các ngôn ngữ:

- `csharp`
- `dart`
- `go`
- `java`
- `javascript`
- `kotlin`
- `php`
- `python`
- `rust`
- `swift`
- `typescript`

Các kiến trúc:

- `basic`: project tối giản để bắt đầu nhanh
- `mvc`: cấu trúc Model-View-Controller
- `mvvm`: cấu trúc Model-View-ViewModel
- `clean-architecture`: tách domain, application, infrastructure, presentation
- `feature-first`: tổ chức theo feature / vertical slice
- `layer-first`: tổ chức theo layer ngang

### Clean Architecture layouts

Khi chọn `clean-architecture` ở interactive mode, Holmes hỏi thêm layout thư mục:

- `feature-first`: mỗi feature tự chứa domain, use case, infrastructure, presentation
- `layer-first`: các layer ngang chứa nhiều feature

Bạn cũng có thể gọi trực tiếp layout cần dùng:

```bash
holmes app --language swift --template feature-first
holmes app --language swift --template layer-first
```

`feature-first` và `layer-first` hiện là template render thật cho tất cả ngôn ngữ, không còn phụ thuộc fallback sang `clean-architecture`.

### Swift options

Riêng Swift template có thêm lựa chọn:

- UI framework: `swiftui` hoặc `uikit`
- Storage: không dùng storage, `swiftdata` hoặc `coredata`
- Khi chọn SwiftUI, Holmes tạo app entrypoint và `ContentView`
- Khi chọn UIKit, Holmes tạo `AppDelegate` và `ViewController`
- Khi chọn SwiftData hoặc Core Data, Holmes tạo file storage tương ứng

Ví dụ:

```bash
holmes ios-notes --language swift --template feature-first --ui swiftui --storage swiftdata
holmes ios-admin --language swift --template layer-first --ui uikit --storage coredata
```

## Upgrade CLI

Nâng cấp package global lên bản mới nhất:

```bash
holmes upgrade
```

Chọn package manager:

```bash
holmes upgrade --package-manager pnpm
```

Xem lệnh upgrade mà không chạy:

```bash
holmes upgrade --dry-run
```

Các package manager hỗ trợ cho upgrade:

- `npm`: `npm install -g holmes@latest`
- `pnpm`: `pnpm add -g holmes@latest`
- `yarn`: `yarn global add holmes@latest`
- `bun`: `bun add -g holmes@latest`

## Phát triển trong repo

Cài dependency:

```bash
npm install
```

Chạy CLI bằng source TypeScript:

```bash
npm run dev -- my-app --language go --template basic --dry-run
```

Build:

```bash
npm run build
```

Chạy bản đã build:

```bash
npm start -- my-app --language go --template basic --dry-run
```

Kiểm tra type:

```bash
npm run lint
```

Chạy test:

```bash
npm test
```

## Thêm template mới

Template nằm trong thư mục:

```text
templates/<language>/<architecture>/
```

Mỗi template cần có:

```text
template.json
files/
```

`template.json` khai báo metadata, biến đầu vào, danh sách file cần render và hook sau khi tạo project. File trong `files/` dùng Handlebars và thường có đuôi `.hbs`.

Ví dụ target trong `template.json`:

```json
{
  "source": "src/index.ts.hbs",
  "target": "src/index.ts"
}
```

Có thể dùng condition để chỉ tạo file khi option bật:

```json
{
  "source": "src/index.test.ts.hbs",
  "target": "src/index.test.ts",
  "condition": "eq includeTests true"
}
```

Các helper Handlebars có sẵn:

- `eq`, `ne`, `and`, `or`, `not`
- `uppercase`, `lowercase`
- `camelCase`, `pascalCase`, `snakeCase`

Các biến phổ biến trong template:

- `projectName`
- `author`
- `license`
- `language`
- `architecture`
- `includeTests`
- `includeDocker`
- `includeGitHubActions`
- `uiFramework`
- `includeStorage`
- `storageProvider`
- `packageManager`
- `year`

## Lưu ý

- `--dry-run` không tạo thư mục output.
- Nếu file đích đã tồn tại và không dùng `--force`, Holmes sẽ hỏi trước khi ghi đè.
- Một số option như `--docker` hoặc `--github-actions` chỉ có hiệu lực khi template có khai báo file tương ứng.
