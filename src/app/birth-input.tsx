import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputField from '../components/InputField';

import GenderSelector, {
  type Gender,
} from '../components/GenderSelector';

import CalendarSelector, {
  type CalendarValue,
} from '../components/CalendarSelector';

import BirthDateInput, {
  type BirthDate,
} from '../components/BirthDateInput';

import BirthTimeInput, {
  type BirthTime,
} from '../components/BirthTimeInput';

import PrimaryButton from '../components/PrimaryButton';

import {
  colors,
  spacing,
  typography,
} from '../theme';

import {
  validateBirthForm,
  type BirthFormErrors
} from '../utils/validation';

export default function BirthInputScreen() {
  const [name, setName] = useState('');

  const [gender, setGender] =
    useState<Gender>('female');

  const [calendar, setCalendar] =
    useState<CalendarValue>({
      type: 'solar',
      leapMonth: false,
    });

  const [birthDate, setBirthDate] =
    useState<BirthDate>({
      year: '',
      month: '',
      day: '',
    });

  const [birthTime, setBirthTime] =
    useState<BirthTime>({
      hour: '',
      minute: '',
      unknown: false,
    });

  const [errors, setErrors] =
    useState<BirthFormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleNameChange = (text: string) => {
    setName(text);

    if (errors.name) {
      setErrors((current) => ({
        ...current,
        name: undefined,
      }));
    }
  };

  const handleBirthDateChange = (value: BirthDate) => {
    setBirthDate(value);
  
    setErrors((current) => ({
      ...current,
      birthDate: undefined,
    }));
  };

  const handleBirthTimeChange = (
    value: BirthTime,
  ) => {
    setBirthTime(value);

    setErrors((current) => ({
        ...current,
        birthTime: undefined,
      }));
  };

  const handleSubmit = async () => {
    const validation = validateBirthForm({
      name,
      calendar,
      birthDate,
      birthTime,
    });

    console.log('입력 날짜:', birthDate);
    console.log('검증 결과:', validation);
    
    setErrors(validation.errors);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        name: name.trim(),
        gender,
        calendar,
        birthDate: {
          year: Number(birthDate.year),
          month: Number(birthDate.month),
          day: Number(birthDate.day),
        },
        birthTime: birthTime.unknown
          ? {
              unknown: true,
              hour: null,
              minute: null,
            }
          : {
              unknown: false,
              hour: Number(birthTime.hour),
              minute: Number(birthTime.minute),
            },
      };

      console.log('사주 입력 정보:', formData);

      // 다음 단계에서 API 호출 및 결과 화면 이동
    } catch (error) {
      console.error('사주 정보 처리 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          사주 정보 입력
        </Text>

        <Text style={styles.subtitle}>
          정확한 생년월일과 출생시간을 입력해주세요.
        </Text>

        <InputField
          label="이름"
          value={name}
          placeholder="홍길동"
          onChangeText={handleNameChange}
          error={errors.name}
        />

        <GenderSelector
          value={gender}
          onChange={setGender}
        />

        <CalendarSelector
          value={calendar}
          onChange={setCalendar}
        />

        <BirthDateInput
          value={birthDate}
          onChange={handleBirthDateChange}
          errors={errors.birthDate}
        />

        <BirthTimeInput
          value={birthTime}
          onChange={handleBirthTimeChange}
          errors={errors.birthTime}
        />

        <PrimaryButton
          title="사주 분석하기"
          loading={isSubmitting}
          onPress={handleSubmit}
        />

        <Text style={styles.notice}>
          입력한 정보는 사주 계산을 위해 사용됩니다.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.section,
  },

  title: {
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    ...typography.titleLarge,
  },

  subtitle: {
    marginBottom: spacing.xxl,
    color: colors.textSecondary,
    ...typography.body,
  },

  notice: {
    marginTop: spacing.md,
    color: colors.textTertiary,
    textAlign: 'center',
    ...typography.caption,
  },
});