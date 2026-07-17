import { router } from 'expo-router';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../theme';

export default function HomeScreen() {
  const handleStart = () => {
    router.push('/birth-input');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>L</Text>
          </View>

          <Text style={styles.title}>Liflow</Text>

          <Text style={styles.subtitle}>
            나를 이해하고,{'\n'}
            삶의 흐름을 발견해보세요.
          </Text>

          <View style={styles.descriptionBox}>
            <Text style={styles.description}>
              생년월일과 출생시간을 입력하면{'\n'}
              나의 사주와 삶의 흐름을 살펴볼 수 있어요.
            </Text>
          </View>
        </View>

        <View style={styles.bottomArea}>
          <Pressable
            onPress={handleStart}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
            ]}
          >
            <Text style={styles.startButtonText}>시작하기</Text>
          </Pressable>

          <Text style={styles.guideText}>
            입력한 정보는 분석을 위해서만 사용돼요.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 72,
    height: 72,
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.round,
    backgroundColor: colors.primaryLight,
  },

  logoText: {
    color: colors.primary,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
  },

  title: {
    color: colors.textPrimary,
    ...typography.display,
  },

  subtitle: {
    marginTop: spacing.md,
    color: colors.textPrimary,
    textAlign: 'center',
    ...typography.title,
  },

  descriptionBox: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  description: {
    color: colors.textSecondary,
    textAlign: 'center',
    ...typography.body,
  },

  bottomArea: {
    gap: spacing.sm,
  },

  startButton: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },

  startButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },

  startButtonText: {
    color: colors.textInverse,
    ...typography.button,
  },

  guideText: {
    color: colors.textTertiary,
    textAlign: 'center',
    ...typography.caption,
  },
});