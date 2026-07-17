import { useRef } from 'react';

import {
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View
} from 'react-native';
  
  import {
    colors,
    radius,
    spacing,
    typography,
} from '../theme';

import type {
    BirthTimeErrors
} from '../utils/validation';
  
  export type BirthTime = {
    hour: string;
    minute: string;
    unknown: boolean;
  };
  
  type Props = {
    value: BirthTime;
    onChange: (value: BirthTime) => void;
    errors?: BirthTimeErrors;
  };
  
  export default function BirthTimeInput({
    value,
    onChange,
    errors,
  }: Props) {
    const minuteInputRef = useRef<TextInput>(null);

    const errorMessage =
      errors?.hour ??
      errors?.minute ??
      errors?.common;

    const handleHourChange = (text: string) => {
      const nextValue = getNumberOnly(text, 2);

      onChange({
        ...value,
        hour: nextValue,
      });

      if (nextValue.length === 2) {
        minuteInputRef.current?.focus();
      }
    };
  
    const handleMinuteChange = (text: string) => {
      const nextValue = getNumberOnly(text, 2);
      onChange({
        ...value,
        minute: nextValue,
      });
    };
  
    const handleUnknownChange = (unknown: boolean) => {
      onChange({
        ...value,
        unknown,
      });
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>출생시간</Text>
  
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: value.unknown }}
            onPress={() => handleUnknownChange(!value.unknown)}
            style={styles.unknownControl}
          >
            <Text
              style={[
                styles.unknownText,
                value.unknown && styles.unknownTextSelected,
              ]}
            >
              시간 모름
            </Text>
  
            <Switch
              value={value.unknown}
              onValueChange={handleUnknownChange}
              trackColor={{
                false: colors.border,
                true: colors.primaryLight,
              }}
              thumbColor={
                value.unknown
                  ? colors.primary
                  : colors.textTertiary
              }
            />
          </Pressable>
        </View>
  
        <View
          style={[
            styles.inputRow,
            value.unknown && styles.disabledInputRow,
          ]}
        >
          <View style={styles.timeField}>
            <TextInput
                value={value.hour}
                placeholder="20"
                placeholderTextColor={colors.textTertiary}
                keyboardType="number-pad"
                maxLength={2}
                editable={!value.unknown}
                accessibilityLabel="출생 시"
                selectionColor={colors.primary}
                onChangeText={handleHourChange}
                style={[
                    styles.input,
                    value.unknown && styles.disabledInput,
                    errors?.hour && !value.unknown && styles.inputError,
                ]}
            />
  
            <Text style={styles.unit}>시</Text>
          </View>
          
          <View style={styles.timeField}>
            <TextInput
                ref={minuteInputRef}
                value={value.minute}
                placeholder="00"
                placeholderTextColor={colors.textTertiary}
                keyboardType="number-pad"
                maxLength={2}
                editable={!value.unknown}
                accessibilityLabel="출생 분"
                selectionColor={colors.primary}
                onChangeText={handleMinuteChange}
                style={[
                    styles.input,
                    value.unknown && styles.disabledInput,
                    errors?.minute && !value.unknown && styles.inputError,
                ]}
            />
  
            <Text style={styles.unit}>분</Text>
          </View>
    </View>
        
        {errorMessage ? (
        <Text style={styles.errorText}>
            {errorMessage}
        </Text>
        ) : (
        <Text style={styles.guideText}>
            출생시간을 모르면 시간 모름을 선택해주세요.
        </Text>
        )}
      </View>
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
  
    labelRow: {
      marginBottom: spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  
    label: {
      color: colors.textPrimary,
      ...typography.label,
    },
  
    unknownControl: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
  
    unknownText: {
      color: colors.textSecondary,
      ...typography.caption,
    },
  
    unknownTextSelected: {
      color: colors.primary,
    },
  
    inputRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },

    timeField: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
  
    disabledInputRow: {
      opacity: 0.6,
    },
  
    input: {
      flex: 1,
      flexBasis: 0,
      minWidth: 0,
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
  
    disabledInput: {
      backgroundColor: colors.background,
      color: colors.textTertiary,
    },
  
    unit: {
      flexShrink :0,
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