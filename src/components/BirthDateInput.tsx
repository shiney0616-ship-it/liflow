import { useRef } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
  
  import {
    colors,
    radius,
    spacing,
    typography,
} from '../theme';

import type {
    BirthDateErrors
} from '../utils/validation.js';
  
  export type BirthDate = {
    year: string;
    month: string;
    day: string;
  };
  
  type Props = {
    value: BirthDate;
    onChange: (value: BirthDate) => void;
    errors?: BirthDateErrors;
  };
  
  export default function BirthDateInput({
    value,
    onChange,
    errors,
  }: Props) {
    const monthInputRef = useRef<TextInput>(null);
    const dayInputRef = useRef<TextInput>(null);

    const errorMessage =
      errors?.year ??
      errors?.month ??
      errors?.day ??
      errors?.common;

    const handleYearChange = (text: string) => {
      const nextValue = getNumberOnly(text, 4);

      onChange({
        ...value,
        year: nextValue,
      });

      if (nextValue.length === 4) {
        monthInputRef.current?.focus();
      }
    };
  
    const handleMonthChange = (text: string) => {
      const nextValue = getNumberOnly(text, 2);
      onChange({
        ...value,
        month: nextValue,
      });

      if (nextValue.length === 2) {
        dayInputRef.current?.focus();
      }
    };
  
    const handleDayChange = (text: string) => {
      const nextValue = getNumberOnly(text, 2);
      onChange({
        ...value,
        day: nextValue,
      });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>생년월일</Text>
  
        <View style={styles.inputRow}>
          <DateInput
            value={value.year}
            placeholder="1990"
            maxLength={4}
            accessibilityLabel="출생 연도"
            onChangeText={handleYearChange}
            error={errors?.year ?? errors?.common}
          />
  
          <Text style={styles.unit}>년</Text>
  
          <DateInput
            inputRef={monthInputRef}
            value={value.month}
            placeholder="01"
            maxLength={2}
            accessibilityLabel="출생 월"
            onChangeText={handleMonthChange}
            error={errors?.month ?? errors?.common}
          />
  
          <Text style={styles.unit}>월</Text>
  
          <DateInput
            inputRef={dayInputRef}
            value={value.day}
            placeholder="01"
            maxLength={2}
            accessibilityLabel="출생 일"
            onChangeText={handleDayChange}
            error={errors?.day ?? errors?.common}
          />
  
          <Text style={styles.unit}>일</Text>
        </View>

        {errorMessage ? (
        <Text style={styles.errorText}>
            {errorMessage}
        </Text>
        ) : (
        <Text style={styles.guideText}>
            양력 또는 음력 생년월일을 입력해주세요.
        </Text>
        )}
      </View>
    );
  }
  
  type DateInputProps = {
    value: string;
    placeholder: string;
    maxLength: number;
    accessibilityLabel: string;
    onChangeText: (text: string) => void;
    error?:string;
    inputRef?: React.RefObject<TextInput | null>;
  };
  
  function DateInput({
    value,
    placeholder,
    maxLength,
    accessibilityLabel,
    onChangeText,
    error,
    inputRef,
  }: DateInputProps) {
    return (
      <TextInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        keyboardType="number-pad"
        maxLength={maxLength}
        accessibilityLabel={accessibilityLabel}
        selectionColor={colors.primary}
        onChangeText={onChangeText}
        style={[
          styles.input,
          error && styles.inputError,
          maxLength === 4 ? styles.yearInput : styles.shortInput,
        ]}
      />
    );
  }
  
  function getNumberOnly(
    value: string,
    maxLength: number,
  ): string {
    return value.replace(/[^0-9]/g, '').slice(0, maxLength);
  }
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    },
  
    label: {
      marginBottom: spacing.xs,
      color: colors.textPrimary,
      ...typography.label,
    },
  
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xxs,
    },
  
    input: {
      height: 52,
      paddingHorizontal: spacing.xs,
  
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
  
      backgroundColor: colors.surface,
      color: colors.textPrimary,
      textAlign: 'center',
  
      ...typography.body,
    },
  
    yearInput: {
      flex: 1.5,
      minWidth: 82,
    },
  
    shortInput: {
      flex: 1,
      minWidth: 54,
    },
  
    unit: {
      color: colors.textSecondary,
      ...typography.body,
    },
  
    guideText: {
      marginTop: spacing.xs,
      color: colors.textTertiary,
      ...typography.caption,
    },

    inputError: {
        borderColor: colors.error,
      },
      
      errorText: {
        marginTop: spacing.xs,
        color: colors.error,
        ...typography.caption,
      },
  });