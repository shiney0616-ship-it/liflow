import { router, useLocalSearchParams } from 'expo-router';
import {
    calculateSaju,
    type CalendarType,
    type Gender,
} from '../engine/saju';

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

  const year = Number(params.year);
const month = Number(params.month);
const day = Number(params.day);

const hour = params.hour
  ? Number(params.hour)
  : undefined;

const minute = params.minute
  ? Number(params.minute)
  : undefined;

const result = calculateSaju({
  name: params.name ?? '',
  gender: (params.gender ?? 'female') as Gender,

  calendarType: (
    params.calendarType ?? 'solar'
  ) as CalendarType,

  isLeapMonth: params.leapMonth === 'true',

  year,
  month,
  day,

  hour,
  minute,

  unknownTime: params.unknownTime === 'true',
});

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

      <Text style={styles.sectionTitle}>
  사주팔자
</Text>

<View style={styles.pillars}>
  <PillarCard
    label="년주"
    stem={result.yearPillar.stem}
    branch={result.yearPillar.branch}
  />

  <PillarCard
    label="월주"
    stem={result.monthPillar.stem}
    branch={result.monthPillar.branch}
  />

  <PillarCard
    label="일주"
    stem={result.dayPillar.stem}
    branch={result.dayPillar.branch}
  />

  <PillarCard
    label="시주"
    stem={result.timePillar?.stem ?? '?'}
    branch={result.timePillar?.branch ?? '?'}
  />
</View>

<Text style={styles.sectionTitle}>
  오행 분포
</Text>

<View style={styles.elementCard}>
  <ElementRow
    label="목"
    count={result.elementCount.wood}
  />
  <ElementRow
    label="화"
    count={result.elementCount.fire}
  />
  <ElementRow
    label="토"
    count={result.elementCount.earth}
  />
  <ElementRow
    label="금"
    count={result.elementCount.metal}
  />
  <ElementRow
    label="수"
    count={result.elementCount.water}
    isLast
  />
</View>
    </ScrollView>
  );
}

type PillarCardProps = {
    label: string;
    stem: string;
    branch: string;
  };
  
  function PillarCard({
    label,
    stem,
    branch,
  }: PillarCardProps) {
    return (
      <View style={styles.pillarCard}>
        <Text style={styles.pillarLabel}>{label}</Text>
        <Text style={styles.stem}>{stem}</Text>
        <Text style={styles.branch}>{branch}</Text>
      </View>
    );
  }
  type ElementRowProps = {
    label: string;
    count: number;
    isLast?: boolean;
  };
  
  function ElementRow({
    label,
    count,
    isLast = false,
  }: ElementRowProps) {
    return (
      <View
        style={[
          styles.elementRow,
          !isLast && styles.elementRowBorder,
        ]}
      >
        <Text style={styles.elementLabel}>
          {label}
        </Text>
  
        <Text style={styles.elementCount}>
          {count}
        </Text>
      </View>
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

  sectionTitle: {
    marginTop: spacing.xxxl,
    color: colors.textPrimary,
    ...typography.title,
  },
  
  pillars: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  
  pillarCard: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  
  pillarLabel: {
    marginBottom: spacing.sm,
    color: colors.textSecondary,
    ...typography.caption,
  },
  
  stem: {
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  
  branch: {
    marginTop: spacing.xs,
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },

  elementCard: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  
  elementRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  elementRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  elementLabel: {
    color: colors.textPrimary,
    ...typography.label,
  },
  
  elementCount: {
    color: colors.textPrimary,
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