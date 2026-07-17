# Liflow Architecture

## 프로젝트 목표

Liflow는 AI와 사주를 결합하여 사용자의 삶의 흐름을 분석하고 상담하는 모바일 서비스이다.

---

# Tech Stack

## Mobile

- React Native
- Expo
- TypeScript

## Backend

- (예정)
- Java(Spring Boot) 또는 NestJS
- PostgreSQL

## AI

- OpenAI API
- Prompt Engine

## Astrology

- 자체 만세력 엔진
- 천간/지지 계산
- 대운/세운 계산

---

# Project Structure

src/

    app/
    components/
    features/
        onboarding/
        saju/
        ai/
        profile/
    services/
    hooks/
    utils/
    types/

---

# 개발 원칙

- TypeScript만 사용
- any 최소화
- 화면(UI)와 비즈니스 로직 분리
- 컴포넌트 재사용
- Git Commit 자주 하기

---

# 개발 순서

1. Landing
2. Onboarding
3. Birth Input
4. Manseryuk Engine
5. Saju Analysis
6. AI Chat
7. Login
8. Subscription
9. Release

---

# AI 역할

- 사주 해석
- 상담
- 질문 생성
- 운세 생성
- 사용자 기억 기반 상담

---

# 만세력 엔진

- 양력 ↔ 음력 변환
- 절기 계산
- 천간/지지
- 오행
- 십성
- 신강/신약
- 대운
- 세운

---

# 향후 기능

- 궁합
- 작명
- 택일
- 풍수
- MBTI
- 성향 분석