import { router, useLocalSearchParams } from 'expo-router';
import {
    Pressable,
    ScrollView,
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

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    name?: string;
    gender?: string;
    calendarType?: string;
    leapMonth?: string;
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    unknownTime?: string;
  }>();

  const isUnknownTime = params.unknownTime === 'true';

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>입력 정보 확인</Text>

      <Text style={styles.description}>
        입력한 정보를 확인해주세요.
      </Text>

      <View style={styles.card}>
        <InfoRow label="이름" value={params.name ?? '-'} />
        <InfoRow
          label="성별"
          value={params.gender === 'female' ? '여성' : '남성'}
        />
        <InfoRow
          label="달력"
          value={getCalendarLabel(
            params.calendarType,
            params.leapMonth,
          )}
        />
        <InfoRow
          label="생년월일"
          value={`${params.year ?? ''}년 ${params.month ?? ''}월 ${
            params.day ?? ''
          }일`}
        />
        <InfoRow
          label="출생시간"
          value={
            isUnknownTime
              ? '시간 모름'
              : `${params.hour ?? ''}시 ${params.minute ?? ''}분`
          }
          isLast
        />
      </View>

      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>입력 수정하기</Text>
      </Pressable>
    </ScrollView>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

function InfoRow({
  label,
  value,
  isLast = false,
}: InfoRowProps) {
  return (
    <View
      style={[
        styles.infoRow,
        !isLast && styles.infoRowBorder,
      ]}
    >
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function getCalendarLabel(
  calendarType?: string,
  leapMonth?: string,
): string {
  if (calendarType === 'lunar') {
    return leapMonth === 'true' ? '음력 윤달' : '음력';
  }

  return '양력';
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.massive,
    backgroundColor: colors.background,
  },

  title: {
    color: colors.textPrimary,
    ...typography.titleLarge,
  },

  description: {
    marginTop: spacing.xs,
    color: colors.textSecondary,
    ...typography.body,
  },

  card: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  infoRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },

  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  infoLabel: {
    color: colors.textSecondary,
    ...typography.label,
  },

  infoValue: {
    flex: 1,
    color: colors.textPrimary,
    textAlign: 'right',
    ...typography.body,
  },

  button: {
    height: 52,
    marginTop: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },

  buttonPressed: {
    backgroundColor: colors.primaryPressed,
  },

  buttonText: {
    color: colors.textInverse,
    ...typography.button,
  },
});