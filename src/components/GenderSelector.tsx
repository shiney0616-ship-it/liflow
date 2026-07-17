import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
    colors,
    radius,
    spacing,
    typography,
} from '../theme';

export type Gender = 'male' | 'female';

type Props = {
  value: Gender;
  onChange: (gender: Gender) => void;
};

export default function GenderSelector({
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>성별</Text>

      <View style={styles.buttonGroup}>
        <GenderButton
          label="남성"
          selected={value === 'male'}
          onPress={() => onChange('male')}
        />

        <GenderButton
          label="여성"
          selected={value === 'female'}
          onPress={() => onChange('female')}
        />
      </View>
    </View>
  );
}

type GenderButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function GenderButton({
  label,
  selected,
  onPress,
}: GenderButtonProps) {
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
});