# 구현 Plan — 글리치 아트 샘플 재설계 (B + C)

설계 문서: `docs/plans/2026-06-20-glitch-art-sample-redesign-design.md`

> 작성자(Opus)가 검토할 예정. Sonnet 서브에이전트는 아래 단계를 순서대로 구현한다.
> 환경: Windows, Next.js 16(Turbopack 미지원 → `next dev --webpack`), Tailwind v4.
> **반드시** 코드 작성 전 `AGENTS.md` 지시대로 `node_modules/next/dist/docs/`의 관련 가이드를 확인할 것.

## 단계 1 — 렌더러에서 공유 프리미티브 export

파일: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- `GRAIN_URI`, `sampleVariables`, `PhotoSurface`, `GeneratedStyleImageSurface`
  선언에 `export`를 붙인다. (타입 `GeneratedStyleImageSlug`, `PhotoScene`도 필요시 export.)
- 기존 함수 시그니처/동작은 변경 금지. 단순히 `function` → `export function`,
  `const GRAIN_URI` → `export const GRAIN_URI`.
- 파일 내부의 기존 사용처는 그대로 동작해야 한다(같은 모듈 내 참조).

## 단계 2 — 글리치 컴포넌트를 클라이언트 파일로 분리

새 파일: `src/components/design-style/GlitchArtInterface.tsx`

- 첫 줄 `"use client";`
- import: `useState`, `useRef`, `useCallback`, `type CSSProperties` (react),
  `type DesignStyle` (`@/data/designStyles`), `cn` (`@/lib/utils`),
  그리고 단계 1에서 export한 `sampleVariables`, `GRAIN_URI`, `GeneratedStyleImageSurface`.
- `GlitchHeading`은 이 새 파일로 **이동**(렌더러 원본에서 제거)하고, 애니메이션 강화 버전으로 만든다.
- Props: `{ className?: string; compact?: boolean; style: DesignStyle }` (기존 `Props`와 동일 형태).

### 컴포넌트 구조

```
export function GlitchArtInterface({ className, compact = false, style }: Props) {
  const [intensity, setIntensity] = useState(0);   // 0..1, 포인터 기반
  const [burst, setBurst] = useState(false);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // compact면 핸들러/버튼 비활성
  const onPointerMove = compact ? undefined : (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setIntensity(Math.min(1, Math.hypot(x - 0.5, y - 0.5) * 2)); // 중심에서 멀수록 강함 (튜닝 가능)
  };
  const onPointerLeave = compact ? undefined : () => setIntensity(0);
  const triggerCorrupt = () => {
    setBurst(true);
    if (burstTimer.current) clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setBurst(false), 800);
  };

  const frameStyle: CSSProperties = {
    ...sampleVariables(style),
    "--glitch-intensity": String(burst ? 1 : 0.18 + intensity * 0.82),
    "--glitch-burst": burst ? "1" : "0",
  } as CSSProperties;

  return (
    <div
      className={cn("glitch-sample st-border relative h-full overflow-hidden bg-[var(--sample-base)] text-[var(--sample-text)]",
        compact ? "min-h-[210px] p-3" : "st-pad min-h-[540px]", className)}
      data-glitch-burst={burst ? "on" : "off"}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={frameStyle}
    >
      {/* 배경 손상 비디오 플레인 (RGB 채널 분리) */}
      {/* 전경 HUD 진단 패널 */}
      {/* 대형 SIGNAL DAMAGE 타이틀 (GlitchHeading) */}
      {/* 라이브 효과 레이어: 스캔라인/플리커/마퀴 */}
      {/* compact이 아니면 CORRUPT 버튼 */}
    </div>
  );
}
```

- `SampleFrame`을 import하지 말고 위처럼 동일 클래스의 래퍼 `<div>`로 직접 구현
  (`SampleFrame`은 export하지 않는다). compact 분기 클래스는 위 그대로.
- `useEffect`로 언마운트 시 `burstTimer.current` 정리.
- 모든 장식 레이어는 `aria-hidden="true"`. 버튼은 `<button type="button">`.

### 비주얼 레이어 상세 (설계 B 반영)

1. **배경 플레인**: `GeneratedStyleImageSurface slug="glitch-art" overlay="dark"`를 `absolute inset-0`로.
   그 위에 같은 영역을 cyan/magenta로 채널 분리한 두 개의 `aria-hidden` span
   (`mix-blend-screen`, `transform: translateX(calc(var(--glitch-intensity) * ±6px))`).
   가로 슬라이스 변위 띠 2~3개(`bg-[var(--sample-accent)]` 등, 강도 비례 translateX).
2. **마크로블록 깨짐**: 기존 macroBlocks 그리드 패턴 재사용/개선, 강도에 따라 변위 증가.
3. **HUD 패널**: 좌상단 라벨 + readout 행(checksum/codec/buffer), 우측 웨이브폼 막대,
   하단 hex/ASCII 마퀴 스트림. 기존 `faultRows`, `asciiRows` 텍스트 자산 재사용 가능.
4. **타이틀**: `GlitchHeading text="SIGNAL"` / `"DAMAGE"`, 애니메이션 채널 스플릿.
5. **스캔라인/플리커**: `repeating-linear-gradient` + keyframes(단계 3).
6. **CORRUPT 버튼**(non-compact): 우하단 또는 헤더 우측, 클릭 시 `triggerCorrupt`.
   라벨 예: `▚ CORRUPT SIGNAL`.

## 단계 3 — globals.css 애니메이션 추가

파일: `src/app/globals.css` (기존 `@keyframes st-glitch` 섹션 ~L1166 근처)

추가할 keyframes(이름 충돌 없게 `glitch-sample-` 접두):
- `glitch-sample-rgb` — 채널 스플릿 span의 translate/opacity 미세 진동.
- `glitch-sample-slice` — 가로 슬라이스 띠 좌우 점프(steps).
- `glitch-sample-scan` — 스캔라인 세로 드리프트.
- `glitch-sample-flicker` — 전체 opacity 미세 깜빡임.
- `glitch-sample-marquee` — hex/ASCII 스트림 가로 흐름.
- `glitch-sample-burst` — `[data-glitch-burst="on"]`일 때 강한 흔들림(짧은 주기).

규칙은 `.glitch-sample` 하위로 스코프. 애니메이션 속도/세기는 `var(--glitch-intensity)`를
`animation-duration` 또는 변위 `calc()`에 활용(가능 범위에서). 강도가 인라인 변수로 들어오므로
주로 `transform: translateX(calc(var(--glitch-intensity) * Npx))` 형태로 정적 강도 + keyframes 진동 병행.

`@media (prefers-reduced-motion: reduce)` 블록(~L1196)에 신규 애니메이션 셀렉터들을
`animation: none;`으로 추가하고, `.glitch-sample` 내 변위도 `transform: none` 처리해 정적화.

## 단계 4 — 렌더러 디스패치 연결

파일: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- 상단에 `import { GlitchArtInterface } from "./GlitchArtInterface";` 추가.
- 기존 파일 내 `GlitchArtInterface` 함수 정의와 `GlitchHeading` 정의를 **삭제**(새 파일로 이동했으므로).
- 디스패치(~L7357) `return <GlitchArtInterface {...props} />;`는 그대로 두되, 이제 import된 것을 사용.
- `GlitchHeading`이 렌더러 내 다른 곳에서 쓰이는지 grep 확인. 만약 글리치 외 다른 컴포넌트가
  `GlitchHeading`을 쓰면, 새 파일에서 `export`하고 렌더러가 import하도록 한다.
  (현재 grep상 `GlitchHeading` 사용처는 글리치 컴포넌트 내부뿐 — 확인 후 진행.)

## 단계 5 — 검증

1. `npx next dev --webpack` (백그라운드) 기동, Ready 확인.
2. Playwright(설치돼 있음)로:
   - `http://localhost:3000/styles/glitch-art` 스크린샷(full) — 풍부한 콜라주 확인.
   - 카드 그리드 페이지(예: `/styles`)에서 글리치 카드 compact 렌더 확인.
   - 포인터 이동/CORRUPT 버튼 동작은 `browser_evaluate`로 CSS 변수 변화 확인하거나 클릭 후 스크린샷.
3. `npm run lint` 통과(특히 `react/jsx-no-comment-textnodes` 함정).
4. TypeScript 에러 없음(빌드 또는 IDE 진단).

## 완료 조건 (Opus 리뷰 체크리스트)

- [ ] full/compact 양쪽에서 깨지지 않고 리치하게 렌더.
- [ ] 포인터 추적·CORRUPT 버스트·앰비언트 동작.
- [ ] reduced-motion에서 정적화.
- [ ] 서버 컴포넌트(렌더러)가 client 컴포넌트를 정상 import, 콘솔 hydration 에러 없음.
- [ ] lint/타입 통과. 기존 다른 스타일 샘플 회귀 없음.
