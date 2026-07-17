import {
    Pressable,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';
  
  import {
    colors,
    radius,
    spacing,
    typography,
} from '../theme';
  
  export type CalendarType = 'solar' | 'lunar';
  
  export type CalendarValue = {
    type: CalendarType;
    leapMonth: boolean;
  };
  
  type Props = {
    value: CalendarValue;
    onChange: (value: CalendarValue) => void;
  };

  export default function CalendarSelector({
    value,
    onChange,
  }: Props) {
    const handleTypeChange = (type: CalendarType) => {
      onChange({
        type,
        leapMonth: type === 'lunar' ? value.leapMonth : false,
      });
    };
  
    const handleLeapMonthChange = (leapMonth: boolean) => {
      onChange({
        ...value,
        leapMonth,
      });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>달력 구분</Text>
  
        <View
          accessibilityRole="radiogroup"
          style={styles.buttonGroup}
        >
          <CalendarButton
            label="양력"
            selected={value.type === 'solar'}
            onPress={() => handleTypeChange('solar')}
          />
  
          <CalendarButton
            label="음력"
            selected={value.type === 'lunar'}
            onPress={() => handleTypeChange('lunar')}
          />
        </View>
  
        {value.type === 'lunar' && (
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{
              checked: value.leapMonth,
            }}
            onPress={() =>
              handleLeapMonthChange(!value.leapMonth)
            }
            style={styles.leapMonthRow}
          >
            <View style={styles.leapMonthTextArea}>
              <Text style={styles.leapMonthLabel}>
                윤달
              </Text>
  
              <Text style={styles.leapMonthDescription}>
                입력한 음력 생일이 윤달인 경우 선택해주세요.
              </Text>
            </View>
  
            <Switch
              value={value.leapMonth}
              onValueChange={handleLeapMonthChange}
              trackColor={{
                false: colors.border,
                true: colors.primaryLight,
              }}
              thumbColor={
                value.leapMonth
                  ? colors.primary
                  : colors.textTertiary
              }
            />
          </Pressable>
        )}
      </View>
    );
  }
  
  type CalendarButtonProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
  };
  
  function CalendarButton({
    label,
    selected,
    onPress,
  }: CalendarButtonProps) {
    return (
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          selected && styles.selectedButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selected && styles.selectedButtonText,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
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
  
    buttonGroup: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
  
    button: {
      flex: 1,
      height: 52,
  
      alignItems: 'center',
      justifyContent: 'center',
  
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
  
      backgroundColor: colors.surface,
    },
  
    selectedButton: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
  
    pressedButton: {
      opacity: 0.8,
    },
  
    buttonText: {
      color: colors.textSecondary,
      ...typography.button,
    },
  
    selectedButtonText: {
      color: colors.primary,
    },
  
    leapMonthRow: {
      marginTop: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
  
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
  
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
  
      backgroundColor: colors.surface,
    },
  
    leapMonthTextArea: {
      flex: 1,
    },
  
    leapMonthLabel: {
      marginBottom: spacing.xxs,
      color: colors.textPrimary,
      ...typography.label,
    },
  
    leapMonthDescription: {
      color: colors.textTertiary,
      ...typography.caption,
    },
  });