# Ruli Playground — Claude 작업 가이드

## 프로젝트 개요
Ruli (legal AI 프로덕트) 디자인 시스템 플레이그라운드.
디자인 에이전시 Figma 딜리버리 → 픽셀 퍼펙 구현이 목표.

**스택:** Next.js 16 · TypeScript · Tailwind CSS v4 · Storybook 10

---

## 폴더 구조

```
src/
├── styles/
│   └── tokens.css       # Tailwind v4 @theme 토큰 (Figma에서 추출) ← 핵심
├── tokens/              # 동일 토큰의 TypeScript 버전 (JS 사용용)
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── components/          # UI 컴포넌트
│   └── [Name]/
│       ├── [Name].tsx           # 컴포넌트 구현
│       ├── [Name].stories.tsx   # Storybook stories
│       └── index.ts             # re-export
└── app/                 # Next.js App Router
    ├── globals.css      # @import "tailwindcss" + tokens.css
    └── layout.tsx
```

---

## Figma → 코드 워크플로우

### 1. Color/Spacing/Typography 토큰 추출
```
1. mcp__figma__get_variable_defs(nodeId, fileKey) 호출
2. src/styles/tokens.css 의 @theme 블록 업데이트
3. src/tokens/*.ts 의 JS 값도 동기화
→ Tailwind 클래스 자동 반영 (bg-primary, text-neutral 등)
```

### 2. 컴포넌트 구현
```
1. mcp__figma__get_design_context(nodeId, fileKey) 호출
2. 스크린샷과 레이아웃 정보로 Tailwind 클래스 매핑
3. 기존 토큰(src/styles/tokens.css)을 Tailwind 클래스로 참조
4. .stories.tsx에 모든 variant/state 문서화
5. npm run storybook으로 시각 검증
```

---

## Tailwind v4 토큰 시스템

**CSS 토큰 (src/styles/tokens.css) — Tailwind용:**
```css
@theme {
  --color-primary: #1a1a2e;
  --color-primary-50: #f0f0ff;
  --font-family-sans: "Inter", sans-serif;
}
```
→ `bg-primary`, `text-primary`, `bg-primary-50` 등으로 사용

**TypeScript 토큰 (src/tokens/colors.ts) — JS 사용용:**
```ts
export const colors = {
  primary: "#1a1a2e",
  "primary-50": "#f0f0ff",
} as const;
```

---

## 컴포넌트 작성 패턴

```tsx
// src/components/Button/Button.tsx
import { type FC } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ variant = "primary", size = "md", ...props }) => {
  return <button className={/* Tailwind classes */} {...props} />;
};

export default Button;
```

---

## Storybook Story 패턴

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", children: "Button" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Button" } };
```

---

## 토큰 네이밍 컨벤션

- Figma 변수명을 최대한 그대로 유지
- CSS 변수: `--color-{name}`, `--font-family-{name}`, `--spacing-{name}`
- Tailwind 클래스: `bg-{name}`, `text-{name}`, `font-{name}` 등
- 예: Figma `color/primary/default` → `--color-primary` → `bg-primary`

---

## 주요 커맨드

```bash
npm run dev          # Next.js 개발 서버 (localhost:3000)
npm run storybook    # Storybook (localhost:6006)
npm run build        # 프로덕션 빌드
```

---

## 아이콘 규칙 (필수)

- **반드시 아래 Nucleo 패키지만 사용.** 직접 inline SVG 아이콘을 만들지 말 것.
- 절대로 커스텀 SVG 아이콘 컴포넌트를 새로 만들지 말 것.
- Storybook placeholder 아이콘도 Nucleo 에서 가져올 것.

### `nucleo-micro-bold` — UI 아이콘 (20px SVG)
- Import: `import { IconName } from "nucleo-micro-bold";`
- 기본 크기: `size="13px"` (디자인 시스템 아이콘 슬롯 13×13)
- 색상: `currentColor` 상속 (부모 `color` 속성으로 제어)
```tsx
import { IconPlus, IconGlobe, IconNote, IconArrowUp } from "nucleo-micro-bold";
<IconPlus size="13px" />
```

### `nucleo-flags` — 국기 아이콘 (32px SVG)
- Import: `import { FlagName } from "nucleo-flags";`
- 기본 크기: `size="32px"` (필요시 조정)
```tsx
import { FlagUs, FlagKr } from "nucleo-flags";
<FlagUs size="20px" />
```

---

## 유의사항

- 토큰은 `src/styles/tokens.css` @theme 에서 관리. 하드코딩 색상/크기 금지.
- TypeScript 토큰 (`src/tokens/`) 은 CSS와 동기화 유지.
- 새 컴포넌트 추가 시 반드시 `.stories.tsx` 함께 작성.
- Figma MCP 결과는 reference — 프로젝트 컨벤션에 맞게 adapt.
- Import: `@storybook/nextjs-vite` (not `@storybook/nextjs`)
