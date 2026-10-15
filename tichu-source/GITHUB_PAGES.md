# GitHub Pages 배포
대상: https://github.com/ahyeonk2/tichu

프로젝트 파일을 저장소 루트에 올립니다. .github 폴더도 포함합니다.
Settings → Pages → Source를 GitHub Actions로 설정합니다.
main 브랜치 업로드 시 자동 배포됩니다. 설정 변경 후 Actions에서 재실행할 수 있습니다.
배포 주소: https://ahyeonk2.github.io/tichu/

## 실행
Node.js 24, pnpm 11.25.0을 사용합니다.
`pnpm install --frozen-lockfile` 다음 `pnpm dev`를 실행합니다.

## 빌드
GitHub Pages: `pnpm run build --base=/tichu/`
일반 루트 도메인: `pnpm build`
